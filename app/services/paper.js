//app/api/paper.js
(function () {
    'use strict';

    var db = require('../models/db');

    var PaperModel = db.paper;
    var PaperVersion = db.paperVersion;
    var PaperSubmission = db.submission;
    var User = db.user;

    var init = function(router) {
        router.get('/get-papers', endpoints.getPapers);
        router.post('/create-paper', endpoints.createPaper);
        router.get('/get-paper', endpoints.getPaper);
        router.get('/get-paper-by-version', endpoints.getPaperByVersion);
        router.post('/update-paper', endpoints.updatePaper);
        router.get('/get-all-papers', endpoints.getAllPapers);
        router.get('/get-paper-versions', endpoints.getPaperVersions);
        router.get('/download-document', endpoints.downloadDocument);
        router.post('/update-paper-current-version', endpoints.updatePaperCurrentVersion);
        router.post('/submit-paper', endpoints.submitPaper);
    };

    var endpoints = {

        getPaperByVersion: function (request, response) {
            console.log('Get PaperID: ' + request.query.paperID + " Version: " + request.query.version );
            return PaperVersion.findOne({
                where: {
                    paperId: request.query.paperID,
                    Version:request.query.version
                },
                include: [PaperModel, User]
            }).then(function (data) {
                response.send({success: true, paper: data});
            });
        },

        getPapers: function(request, response) {
            console.log(request.query);
            console.log("----------------------------------------------------------------------------------");
            console.log(request.query.userID);
            var papers;
            console.log("---Exec: Paper.findAll---");
            return PaperModel.findAll({
                where:{
                    userID:request.query.userID
                }
            }).then(function(data){
                papers = data;
                console.log("---Exec: PaperVersion.findAll---");
                //   return PaperVersion.query("SELECT * FROM 'paperVersions' WHERE 'userID' ='1'", { type: PaperVersion.QueryTypes.SELECT})
                return PaperVersion.findAll({
                    where:{
                        userID:request.query.userID
                    }
                });
            }).then(function (versions) {
                var paperList=[];
                var paperObj;
                for(var i=0; i<papers.length; i++){
                    for (var j=0; j<versions.length;j++){
                        if (papers[i].id === versions[j].paperId && papers[i].CurrentVersion === versions[j].Version){
                            paperObj={
                                ID: versions[j].ID,
                                Title:versions[j].Title,
                                ContributingAuthors:versions[j].ContributingAuthors,
                                Description:versions[j].Description,
                                Document:versions[j].Document,
                                Version:versions[j].Version,
                                PaperFormat:versions[j].PaperFormat,
                                createdAt:versions[j].createdAt,
                                updatedAt:versions[j].updatedAt,
                                paperId:versions[j].paperId,
                                userID:versions[j].userID,
                                Status:papers[i].Status,
                                originalCreatedDate:papers[i].createdAt
                            };
                            paperList.push(paperObj);
                        }
                    }
                }
                console.log("--Sending response to client---");

                for (i=0; i<paperList.length;i++){
                    console.log(paperList[i].Status +";" + paperList[i].ID);
                }

                response.send({success: true,  paperList: paperList});
            });
        },

        getAllPapers: function(request, response) {
            console.log(request.query);
            console.log("----------------------------------------------------------------------------------");
            console.log(request.query.userID);
            PaperModel.findAll({
            })
                .then(function(papers){
                    response.send(papers);
                });
        },

        getPaper: function(request, response) {
            console.log('Get Paper - UserID:' + request.query.userID + ' ; PaperID: ' + request.query.paperID);
            return PaperModel.findOne({
                where:{
                    userID:request.query.userID,
                    id:request.query.paperID
                }
            }).then(function(paper){
                return PaperVersion.find({
                    where:{
                        paperId:paper.id,
                        Version:paper.CurrentVersion
                    }
                }).then(function(version){
                    var paperObj={
                        ID: version.ID,
                        Title:version.Title,
                        ContributingAuthors:version.ContributingAuthors,
                        Description:version.Description,
                        //Document:version.Document,  NOTE: we do not want to send the document on this endpoint, since it might be a lot of data
                        //Instead, refer to the "download-document" endpoint
                        Version:version.Version,
                        PaperFormat:version.PaperFormat,
                        createdAt:version.createdAt,
                        updatedAt:version.updatedAt,
                        paperId:version.paperId,
                        userID:version.userID,
                        Status:paper.Status,
                        originalCreatedDate:paper.createdAt
                    };

                    response.send({success: true,  paper: paperObj});
                });
            });
        },

        downloadDocument: function(request, response) {
            return PaperModel.findOne({
                where:{
                    id:request.query.paperID
                }
            }).then(function(paper){
                if(!paper){
                    console.log('ERROR: No paper found with id: ', request.query.paperID);
                }


                return PaperVersion.find({
                    where:{
                        paperId:paper.id,
                        Version:paper.CurrentVersion
                    }
                });
            }).then(function(version){
                response.send(version.Document);
            });
        },

        getPaperVersions: function(request, response) {
            console.log('Get Paper - UserID:' + request.query.userID + ' ; PaperID: ' + request.query.paperID);
            return PaperModel.findOne({
                where:{
                    userID:request.query.userID,
                    id:request.query.paperID
                }
            }).then(function(paper){
                console.log("---Exec: PaperVersion.findAll---");
                return PaperVersion.findAll({
                    where:{
                        paperId:paper.id
                    }
                }).then(function(versions){
                    console.log("---Exec: Send Response---");
                    response.send({success: true,  paper: paper, versions:versions});
                });
            });
        },

        createPaper: function(req, res) {
            console.log(req.body);
            PaperModel.create({
                userID:req.body.userID,
                Status:'Pending Submission',
                CurrentVersion:1.0
            })
                .then(function(paper) {
                    console.log("--------");
                    console.log(req.body.userID);
                    PaperVersion.create({
                        paperId:paper.id,
                        userID:req.body.userID,
                        Version:1.0,
                        ContributingAuthors:req.body.ContributingAuthors,
                        Description:req.body.Description,
                        Document:req.body.Document,
                        Title:req.body.Title,
                        PaperFormat:"PDF" //TODO - change this
                    }).then(function(version){
                        res.json({success: true, paper: paper, version:version});
                    });
                });
        },

        updatePaper: function(req, res) {
            console.log(req.body);
            return PaperVersion.max('Version',{
                where:{paperId:req.body.paperId}
            }).then(function(max){
                return PaperVersion.create({
                    paperId:req.body.paperId,
                    userID:req.body.userID,
                    Version:(max + 1),
                    ContributingAuthors:req.body.ContributingAuthors,
                    Description:req.body.Description,
                    Title:req.body.Title,
                    Document:req.body.Document,
                    PaperFormat:"PDF"
                }).then(function(version){
                    return PaperModel.update({
                        CurrentVersion:(max +1)
                    },{ where: {id: req.body.paperId} })
                        .then(function(paper) {
                            res.json({success: true, paper: paper, version:version});
                        });
                });
            });


        },

        updatePaperCurrentVersion: function(req, res) {
            console.log("--Exec: PaperModel.update");
            PaperModel.update({
                CurrentVersion:req.body.params.version
            },{ where: {id: req.body.params.paperId} })
                .then(function(paper) {
                    console.log("--Exec: Send response");
                    res.json({success: true, paper: paper});
                });
        },

        submitPaper: function(req, res) {
            console.log("--Exec: PaperModel.update");
            return PaperModel.update({
                Status:'Submitted'
            },{ where: {id: req.body.params.paperId} })
                .then(function(/*paper*/) {
                    PaperSubmission.create({
                        paperId:req.body.params.paperId
                    }).then(function(submission){
                        console.log("--Exec: Send response");
                        res.json({success: true, paper: submission});
                    });
                });
        }
    };

    module.exports = {
        init: init
    };

}());
