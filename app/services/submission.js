//app/api/paper.js
(function () {
    'use strict';

    var db = require('../models/db');

    var PaperModel = db.paper;
    var PaperVersion = db.paperVersion;
    var PaperSubmission = db.submission;
    var Review = db.review;
    var User = db.user;

    var init = function (router) {
        router.get('/get-my-assigned-reviews', endpoints.getMyAssignedReviews);
        router.get('/get-submission', endpoints.getSubmission);
    };

    var endpoints = {

        getSubmission: function (request, response) {
            console.log('Get PaperID: ' + request.query.paperID);
            return PaperSubmission.findOne({
                where: {
                    paperId: request.query.paperID,
                },
                include: [PaperModel, Review]
            }).then(function (data) {
                response.send({success: true, submission: data});
            });
        },


        getMyAssignedReviews: function (request, response) {
            console.log("----------------------------------------------------------------------------------");
            console.log(request.query.userID);
            console.log("----------------------------------------------------------------------------------");
            var userId = request.query.userID;
            var papers;
            var paperSubmissions;
            //queries the Submission table for reviews that are assigned to 'me'
            return PaperSubmission.findAll({
                where: {
                    $or: [
                        {Reviewer1ID: {$eq: userId}},
                        {Reviewer2ID: {$eq: userId}},
                        {Reviewer3ID: {$eq: userId}}
                    ]
                },
                include: [Review]
            }).then(function (data) {
                paperSubmissions = data;
                // this loop builds an "OR" statement with paper id
                var str=' WHERE (';
                for(var i=0;i<data.length;i++) {
                    str = str + "`paperVersions`.`paperId` = " + data[i].paperId;
                    if (i != data.length-1)
                        str = str + " OR "
                }
                str = str + ')'
                console.log(str);
                // queries the version table to get the current version of the papers that are assigned to 'me'
                return db.sequelize.query("SELECT * FROM paperVersions LEFT OUTER JOIN `papers`  ON `paperVersions`.`paperId` = `papers`.`id` " + str +  " AND `paperVersions`.`Version` = `papers`.`CurrentVersion`")
                .then(function (data) {
                    console.log(data);
                    papers = data;
                    response.send({success: true, papers: data, submissions: paperSubmissions});
                });
            });
        }
    };

/*
         getMyAssignedReviews:function (request, response) {
                console.log(request.query);
                console.log("----------------------------------------------------------------------------------");
                console.log(request.query.userID);
                var submittedPapers;
                var paperVersion;
                var paperList = [];
                var awaitingReviewList = [];
                console.log("---Exec: Paper.findAll---");
                return PaperModel.findAll({
                    where: {
                        Status: 'Submitted'
                    }
                }).then(function (data) {
                    submittedPapers = data;
                    console.log("---Exec: PaperVersion.findAll---");
                    return PaperVersion.findAll({});
                }).then(function (versions) {
                    var paperObj;
                    for (var i = 0; i < submittedPapers.length; i++) {
                        for (var j = 0; j < versions.length; j++) {
                            if (submittedPapers[i].id === versions[j].paperId && submittedPapers[i].CurrentVersion === versions[j].Version) {
                                paperObj = {
                                    ID: versions[j].ID,
                                    Title: versions[j].Title,
                                    ContributingAuthors: versions[j].ContributingAuthors,
                                    Description: versions[j].Description,
                                    Version: versions[j].Version,
                                    PaperFormat: versions[j].PaperFormat,
                                    createdAt: versions[j].createdAt,
                                    updatedAt: versions[j].updatedAt,
                                    paperId: versions[j].paperId,
                                    userID: versions[j].userID,
                                    Status: submittedPapers[i].Status,
                                    originalCreatedDate: submittedPapers[i].createdAt
                                };
                                paperList.push(paperObj);
                            }
                        }
                    }
                    console.log("--Sending response to client---");

                    for (var i = 0; i < paperList.length; i++) {
                        console.log(paperList[i].Status + ";" + paperList[i].ID);
                    }

                    return PaperSubmission.findAll({
                        where: {
                            $or: [
                                {
                                    Reviewer1ID: {$eq: request.query.userID}
                                },
                                {
                                    Reviewer2ID: {$eq: request.query.userID}
                                },
                                {
                                    Reviewer3ID: {$eq: request.query.userID}
                                }
                            ]
                        }
                    });
                }).then(function (myReviews) {
                    console.log(myReviews);
                    return Review.findAll(
                        {attributes: ['id']}
                    );
                    //response.send({success: true,  paper: myReviews});
                })
            }
  */

    module.exports = {
        init: init
    };

}
    ()
    );
