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
        router.get('/get-submission', endpoints.getSubmission);
        router.get('/get-submission-by-paperId', endpoints.getSubmissionByPaperID);
        router.post('/update-submission-with-reviewers',endpoints.updateSubmissionWithReviewers);
        router.get('/get-my-assigned-submission-reviews', endpoints.getMyAssignedSubmissionReviews);
        router.get('/get-all-submissions', endpoints.getAllSubmissions);
        router.get('/get-submission-by-id', endpoints.getSubmissionById);
    };

    var endpoints = {

        getSubmissionByPaperID: function (request, response) {
            var paperId = request.query.paperId;

            /*
             SELECT
             paperversions.paperId             AS "PaperId",
             paperversions.ID                  AS "PaperVersionId",
             submissions.ID                    AS "SubmissionId",
             papers.CurrentVersion             AS "CurrentVersion",
             papers.Status                     AS "PaperStatus",
             papers.userID                     AS "PaperAuthorId",
             papers.createdAt                  AS "OriginalCreatedAt",
             paperversions.Title               AS "PaperTitle",
             paperversions.ContributingAuthors AS "PaperContibutingAuthors",
             paperversions.Description         AS "PaperDescription",
             paperversions.Document            AS "PaperDocument",
             paperversions.PaperFormat         AS "PaperFormat",
             paperversions.createdAt           AS "VersionCreatedAt",
             submissions.PCCID                 AS "SubmissionPCCId",
             submissions.Reviewer1ID           AS "SubmissionReviewer1Id",
             submissions.Reviewer2ID           AS "SubmissionReviewer2Id",
             submissions.Reviewer3ID           AS "SubmissionReviewer3Id",
             submissions.createdAt             AS "SubmissionCreatedAt",
             users.FirstName                   AS "UserFirstName",
             users.LastName                    AS "UserLastName",
             users.Email                       AS "UserEmail"
             FROM paperVersions
             INNER JOIN papers
             ON (paperVersions.paperId = papers.id AND paperVersions.Version = papers.CurrentVersion)
             INNER JOIN submissions ON (papers.id = submissions.paperId)
             INNER JOIN users ON (users.ID = papers.userID)
             WHERE submissions.ID = "111" <--- Note: change this
             */

            var sql_query ='SELECT paperversions.paperId AS "PaperId", paperversions.ID AS "PaperVersionId", submissions.ID AS "SubmissionId", papers.CurrentVersion AS "CurrentVersion", papers.Status AS "PaperStatus", papers.userID AS "PaperAuthorId", papers.createdAt AS "OriginalCreatedAt", paperversions.Title AS "PaperTitle", paperversions.ContributingAuthors AS "PaperContibutingAuthors", paperversions.Description AS "PaperDescription", paperversions.Document AS "PaperDocument", paperversions.PaperFormat AS "PaperFormat", paperversions.createdAt AS "VersionCreatedAt", submissions.PCCID AS "SubmissionPCCId", submissions.Reviewer1ID AS "SubmissionReviewer1Id", submissions.Reviewer2ID AS "SubmissionReviewer2Id", submissions.Reviewer3ID AS "SubmissionReviewer3Id", submissions.createdAt AS "SubmissionCreatedAt", users.FirstName AS "UserFirstName",users.LastName AS "UserLastName", users.Email AS "UserEmail"' +
                'FROM paperVersions ' +
                'INNER JOIN papers ON (paperVersions.paperId = papers.id AND paperVersions.Version = papers.CurrentVersion) ' +
                'INNER JOIN submissions ON (papers.id = submissions.paperId) ' +
                'INNER JOIN users ON (users.ID = papers.userID)' +
                'WHERE submissions.paperId = "'+paperId+'"';

            return  db.sequelize.query(sql_query)
                .then(function (data) {
                    console.log(data);
                    response.send({success: true, submission: data});
                });
        },


        getSubmissionById: function (request, response) {
            var submissionId = request.query.submissionId;

            /*
             SELECT
             paperversions.paperId             AS "PaperId",
             paperversions.ID                  AS "PaperVersionId",
             submissions.ID                    AS "SubmissionId",
             papers.CurrentVersion             AS "CurrentVersion",
             papers.Status                     AS "PaperStatus",
             papers.userID                     AS "PaperAuthorId",
             papers.createdAt                  AS "OriginalCreatedAt",
             paperversions.Title               AS "PaperTitle",
             paperversions.ContributingAuthors AS "PaperContibutingAuthors",
             paperversions.Description         AS "PaperDescription",
             paperversions.Document            AS "PaperDocument",
             paperversions.PaperFormat         AS "PaperFormat",
             paperversions.createdAt           AS "VersionCreatedAt",
             submissions.PCCID                 AS "SubmissionPCCId",
             submissions.Reviewer1ID           AS "SubmissionReviewer1Id",
             submissions.Reviewer2ID           AS "SubmissionReviewer2Id",
             submissions.Reviewer3ID           AS "SubmissionReviewer3Id",
             submissions.createdAt             AS "SubmissionCreatedAt",
             users.FirstName                   AS "UserFirstName",
             users.LastName                    AS "UserLastName",
             users.Email                       AS "UserEmail"
             FROM paperVersions
             INNER JOIN papers
             ON (paperVersions.paperId = papers.id AND paperVersions.Version = papers.CurrentVersion)
             INNER JOIN submissions ON (papers.id = submissions.paperId)
             INNER JOIN users ON (users.ID = papers.userID)
             WHERE submissions.ID = "111" <--- Note: change this
             */

            var sql_query ='SELECT paperversions.paperId AS "PaperId", paperversions.ID AS "PaperVersionId", submissions.ID AS "SubmissionId", papers.CurrentVersion AS "CurrentVersion", papers.Status AS "PaperStatus", papers.userID AS "PaperAuthorId", papers.createdAt AS "OriginalCreatedAt", paperversions.Title AS "PaperTitle", paperversions.ContributingAuthors AS "PaperContibutingAuthors", paperversions.Description AS "PaperDescription", paperversions.Document AS "PaperDocument", paperversions.PaperFormat AS "PaperFormat", paperversions.createdAt AS "VersionCreatedAt", submissions.PCCID AS "SubmissionPCCId", submissions.Reviewer1ID AS "SubmissionReviewer1Id", submissions.Reviewer2ID AS "SubmissionReviewer2Id", submissions.Reviewer3ID AS "SubmissionReviewer3Id", submissions.createdAt AS "SubmissionCreatedAt", users.FirstName AS "UserFirstName",users.LastName AS "UserLastName", users.Email AS "UserEmail"' +
                'FROM paperVersions ' +
                'INNER JOIN papers ON (paperVersions.paperId = papers.id AND paperVersions.Version = papers.CurrentVersion) ' +
                'INNER JOIN submissions ON (papers.id = submissions.paperId) ' +
                'INNER JOIN users ON (users.ID = papers.userID)' +
                'WHERE submissions.ID = "'+submissionId+'"';

            return  db.sequelize.query(sql_query)
                .then(function (data) {
                    console.log(data);
                    response.send({success: true, submission: data});
                });
        },

        getAllSubmissions: function (request, response) {
            /*
             SELECT
             paperversions.paperId             AS "PaperId",
             paperversions.ID                  AS "PaperVersionId",
             submissions.ID                    AS "SubmissionId",
             papers.CurrentVersion             AS "CurrentVersion",
             papers.Status                     AS "PaperStatus",
             papers.userID                     AS "PaperAuthorId",
             papers.createdAt                  AS "OriginalCreatedAt",
             paperversions.Title               AS "PaperTitle",
             paperversions.ContributingAuthors AS "PaperContibutingAuthors",
             paperversions.Description         AS "PaperDescription",
             paperversions.Document            AS "PaperDocument",
             paperversions.PaperFormat         AS "PaperFormat",
             paperversions.createdAt           AS "VersionCreatedAt",
             submissions.PCCID                 AS "SubmissionPCCId",
             submissions.Reviewer1ID           AS "SubmissionReviewer1Id",
             submissions.Reviewer2ID           AS "SubmissionReviewer2Id",
             submissions.Reviewer3ID           AS "SubmissionReviewer3Id",
             submissions.createdAt             AS "SubmissionCreatedAt",
             users.FirstName                   AS "UserFirstName",
             users.LastName                    AS "UserLastName",
             users.Email                       AS "UserEmail"
             FROM paperVersions
             INNER JOIN papers
             ON (paperVersions.paperId = papers.id AND paperVersions.Version = papers.CurrentVersion)
             INNER JOIN submissions ON (papers.id = submissions.paperId)
             INNER JOIN users ON (users.ID = papers.userID)
             WHERE papers.Status = "Submitted"
             */

            var sql_query ='SELECT paperversions.paperId AS "PaperId", paperversions.ID AS "PaperVersionId", submissions.ID AS "SubmissionId", papers.CurrentVersion AS "CurrentVersion", papers.Status AS "PaperStatus", papers.userID AS "PaperAuthorId", papers.createdAt AS "OriginalCreatedAt", paperversions.Title AS "PaperTitle", paperversions.ContributingAuthors AS "PaperContibutingAuthors", paperversions.Description AS "PaperDescription", paperversions.Document AS "PaperDocument", paperversions.PaperFormat AS "PaperFormat", paperversions.createdAt AS "VersionCreatedAt", submissions.PCCID AS "SubmissionPCCId", submissions.Reviewer1ID AS "SubmissionReviewer1Id", submissions.Reviewer2ID AS "SubmissionReviewer2Id", submissions.Reviewer3ID AS "SubmissionReviewer3Id", submissions.createdAt AS "SubmissionCreatedAt", users.FirstName AS "UserFirstName",users.LastName AS "UserLastName", users.Email AS "UserEmail"' +
                'FROM paperVersions ' +
                'INNER JOIN papers ON (paperVersions.paperId = papers.id AND paperVersions.Version = papers.CurrentVersion) ' +
                'INNER JOIN submissions ON (papers.id = submissions.paperId) ' +
                'INNER JOIN users ON (users.ID = papers.userID)' +
                'WHERE papers.Status <> "Pending Submission"';

            return  db.sequelize.query(sql_query)
                .then(function (data) {
                    console.log(data);
                    response.send({success: true, submissions: data});
            });
        },

        getMyAssignedSubmissionReviews: function (request, response) {
            var review_pcmID = request.query.userID;

            /*
             SELECT
             paperversions.paperId             AS "PaperId",
             paperversions.ID                  AS "PaperVersionId",
             submissions.ID                    AS "SubmissionId",
             papers.CurrentVersion             AS "CurrentVersion",
             papers.Status                     AS "PaperStatus",
             papers.userID                     AS "PaperAuthor",
             papers.createdAt                  AS "OriginalCreatedAt",
             paperversions.Title               AS "PaperTitle",
             paperversions.ContributingAuthors AS "PaperContibutingAuthors",
             paperversions.Description         AS "PaperDescription",
             paperversions.Document            AS "PaperDocument",
             paperversions.PaperFormat         AS "PaperFormat",
             paperversions.createdAt           AS "VersionCreatedAt",
             submissions.PCCID                 AS "SubmissionPCCId",
             submissions.Reviewer1ID           AS "SubmissionReviewer1Id",
             submissions.Reviewer2ID           AS "SubmissionReviewer2Id",
             submissions.Reviewer3ID           AS "SubmissionReviewer3Id",
             submissions.createdAt             AS "SubmissionCreatedAt",
             users.FirstName                   AS "UserFirstName",
             users.LastName                    AS "UserLastName",
             users.Email                       AS "UserEmail"

             FROM paperVersions
             INNER JOIN papers ON (paperVersions.paperId = papers.id AND paperVersions.Version = papers.CurrentVersion)
             INNER JOIN submissions ON (papers.id = submissions.paperId)
             INNER JOIN users ON (users.ID = papers.userID)
             WHERE submissions.Reviewer1ID = '51' OR submissions.Reviewer2ID = '51' OR submissions.Reviewer3ID = '51' // <--- NOTE: change the ids
             */

            var sql_query = 'SELECT paperversions.paperId AS "PaperId", paperversions.ID AS "PaperVersionId", submissions.ID AS "SubmissionId", papers.CurrentVersion AS "CurrentVersion", papers.Status AS "PaperStatus", papers.userID AS "PaperAuthor", papers.createdAt AS "OriginalCreatedAt", paperversions.Title AS "PaperTitle", paperversions.ContributingAuthors AS "PaperContibutingAuthors", paperversions.Description AS "PaperDescription", paperversions.Document AS "PaperDocument", paperversions.PaperFormat AS "PaperFormat", paperversions.createdAt AS "VersionCreatedAt", submissions.PCCID AS "SubmissionPCCId", submissions.Reviewer1ID AS "SubmissionReviewer1Id", submissions.Reviewer2ID AS "SubmissionReviewer2Id", submissions.Reviewer3ID AS "SubmissionReviewer3Id", submissions.createdAt AS "SubmissionCreatedAt", users.FirstName AS "UserFirstName",users.LastName AS "UserLastName", users.Email AS "UserEmail"' +
                'FROM paperVersions ' +
                'INNER JOIN papers ON (paperVersions.paperId = papers.id AND paperVersions.Version = papers.CurrentVersion) ' +
                'INNER JOIN submissions ON (papers.id = submissions.paperId) ' +
                'INNER JOIN users ON (users.ID = papers.userID)' +
                'WHERE submissions.Reviewer1ID = "'+review_pcmID+'" OR submissions.Reviewer2ID = "'+review_pcmID+'" OR submissions.Reviewer3ID = "'+review_pcmID+'"';

            return db.sequelize.query(sql_query)
                .then(function (data) {
                    response.send({success: true, submissions: data});
                })
        },

        getSubmission: function(req,res){
          PaperSubmission.find({
            where:{
              paperId: req.query.paperId
            }
          }).then(function(submission){
            res.send(submission);
          });
        },

        updateSubmissionWithReviewers: function(request,response){
          console.log("inside updateSubmissionWithReviewers paperId : "+request.body.params.paperID);
          console.log("reviewer1 : "+request.body.params.reviewer1);
          console.log("reviewer2 : "+request.body.params.reviewer2);
          console.log("reviewer3 : "+request.body.params.reviewer3);

          PaperSubmission.update({
            Reviewer1ID : request.body.params.reviewer1,
            Reviewer2ID : request.body.params.reviewer2,
            Reviewer3ID : request.body.params.reviewer3
          },{
            where :{
              paperId : request.body.params.paperID
            }
          })
          .then(function(submission){
            response.json({success: true, submission: submission});
          });
        }

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
    };

    module.exports = {
        init: init
    };

  }()
);
