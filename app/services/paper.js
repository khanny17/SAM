//app/api/paper.js
(function () {
    'use strict';

    var db = require('../models/db');

    var PaperModel = db.paper;
    var PaperVersion = db.paperVersion;

    var init = function(router) {
        router.get('/get-papers', endpoints.getPapers);
        router.post('/create-paper', endpoints.createPaper);
        router.get('/get-paper', endpoints.getPaper);
        router.post('/update-paper', endpoints.updatePaper);
        router.get('/get-all-papers', endpoints.getAllPapers);
    };

    var endpoints = {

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

                for (var i=0; i<paperList.length;i++){
                console.log(paperList[i].Status +";" + paperList[i].ID)
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
                    Title:req.body.Title,
                    PaperFormat:"PDF" //TODO - change this
                }).then(function(version){
                    res.json({success: true, paper: paper, version:version});
                });
            });
        },

        updatePaper: function(req, res) {
            console.log(req.body);
            PaperVersion.create({
                paperId:req.body.paperId,
                userID:req.body.userID,
                Version:(req.body.Version + 1),
                ContributingAuthors:req.body.ContributingAuthors,
                Description:req.body.Description,
                Title:req.body.Title,
                PaperFormat:"PDF"
            }).then(function(version){
                PaperModel.update({
                    CurrentVersion:(req.body.Version +1)
                },{ where: {id: req.body.paperId} })
                    .then(function(paper) {
                        res.json({success: true, paper: paper, version:version});
                    });
            });
        }
    };

    module.exports = {
        init: init
    };

}());
