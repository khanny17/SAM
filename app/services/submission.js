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
        router.get('/get-my-assigned-submission-reviews', endpoints.getMyAssignedSubmissionReviews);
        router.get('/get-all-submissions', endpoints.getAllSubmissions);
        router.get('/get-submission-by-id', endpoints.getSubmissionById);
    };

    var endpoints = {


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
                'WHERE papers.Status = "Submitted"';

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
                });
        }


    };


    module.exports = {
        init: init
    };

}
    ()
    );
