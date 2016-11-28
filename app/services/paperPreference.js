//app/api/paperPreference.js
(function () {
    'use strict';

    var db = require('../models/db');
    var PaperPreferenceModel = db.paperPreference;

    var init = function(router) {
        router.get('/get-paperPreferences', endpoints.getAllPaperPreferences);
        router.post('/set-paper-preference', endpoints.setPaperPreference);
        router.get('/get-my-paper-preferences', endpoints.getMyPaperPreferences);
        router.get('/get-all-paper-preferences', endpoints.getAllPaperPreferences);
    };

    var endpoints = {

        getMyPaperPreferences: function(request, response) {
            var pcmID = request.query.userID;

            /*
             SELECT
             submissions.ID                    AS "SubmissionId",
             paperversions.paperId             AS "PaperId",
             paperversions.ID                  AS "PaperVersionId",
             paperpreferences.ID               AS "PaperPreferenceId",
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
             users.Email                       AS "UserEmail",
             paperpreferences.PCMID            AS "PaperPreferencePCMID",
             paperpreferences.SubmissionID     AS "PaperPreferenceSubmissionId",
             paperpreferences.createdAt        AS "PaperPreferenceCreatedAt"

             FROM paperVersions
             INNER JOIN papers ON (paperVersions.paperId = papers.id AND paperVersions.Version = papers.CurrentVersion)
             INNER JOIN submissions ON (papers.id = submissions.paperId)
             INNER JOIN paperpreferences ON (paperpreferences.submissionID = submissions.ID)
             INNER JOIN users ON (users.ID = papers.userID)
             WHERE paperpreferences.PCMID = "31"  <--- NOTE change this

             */

            var sql_query = 'SELECT submissions.ID AS "SubmissionId", paperversions.paperId AS "PaperId", paperversions.ID AS "PaperVersionId", paperpreferences.ID AS "PaperPreferenceId", papers.CurrentVersion AS "CurrentVersion", papers.Status AS "PaperStatus", papers.userID AS "PaperAuthor", papers.createdAt AS "OriginalCreatedAt", paperversions.Title AS "PaperTitle", paperversions.ContributingAuthors AS "PaperContibutingAuthors", paperversions.Description AS "PaperDescription", paperversions.Document AS "PaperDocument", paperversions.PaperFormat AS "PaperFormat", paperversions.createdAt AS "VersionCreatedAt", submissions.PCCID AS "SubmissionPCCId", submissions.Reviewer1ID AS "SubmissionReviewer1Id", submissions.Reviewer2ID AS "SubmissionReviewer2Id", submissions.Reviewer3ID AS "SubmissionReviewer3Id", submissions.createdAt AS "SubmissionCreatedAt", users.FirstName AS "UserFirstName", users.LastName AS "UserLastName", users.Email AS "UserEmail", paperpreferences.PCMID AS "PaperPreferencePCMID", paperpreferences.SubmissionID AS "PaperPreferenceSubmissionId", paperpreferences.createdAt AS "PaperPreferenceCreatedAt" ' +
                'FROM paperVersions ' +
                'INNER JOIN papers ON (paperVersions.paperId = papers.id AND paperVersions.Version = papers.CurrentVersion) ' +
                'INNER JOIN submissions ON (papers.id = submissions.paperId) ' +
                'INNER JOIN paperpreferences ON (paperpreferences.submissionID = submissions.ID) ' +
                'INNER JOIN users ON (users.ID = papers.userID) ' +
                'WHERE paperpreferences.PCMID = "'+pcmID+'"';

            return db.sequelize.query(sql_query)
                .then(function (data) {
                   console.log(data);
                    response.send({success: true, preferences: data});
                });
        },


        getAllPaperPreferences: function (request, response) {
            var pcmID = request.query.userID;
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
             WHERE papers.Status = "Submitted AND papers.userID !="4" <--- NOTE change this
             */

            var sql_query ='SELECT paperversions.paperId AS "PaperId", paperversions.ID AS "PaperVersionId", submissions.ID AS "SubmissionId", papers.CurrentVersion AS "CurrentVersion", papers.Status AS "PaperStatus", papers.userID AS "PaperAuthorId", papers.createdAt AS "OriginalCreatedAt", paperversions.Title AS "PaperTitle", paperversions.ContributingAuthors AS "PaperContibutingAuthors", paperversions.Description AS "PaperDescription", paperversions.Document AS "PaperDocument", paperversions.PaperFormat AS "PaperFormat", paperversions.createdAt AS "VersionCreatedAt", submissions.PCCID AS "SubmissionPCCId", submissions.Reviewer1ID AS "SubmissionReviewer1Id", submissions.Reviewer2ID AS "SubmissionReviewer2Id", submissions.Reviewer3ID AS "SubmissionReviewer3Id", submissions.createdAt AS "SubmissionCreatedAt", users.FirstName AS "UserFirstName",users.LastName AS "UserLastName", users.Email AS "UserEmail"' +
                'FROM paperVersions ' +
                'INNER JOIN papers ON (paperVersions.paperId = papers.id AND paperVersions.Version = papers.CurrentVersion) ' +
                'INNER JOIN submissions ON (papers.id = submissions.paperId) ' +
                'INNER JOIN users ON (users.ID = papers.userID)' +
                'WHERE papers.Status = "Submitted" AND papers.userID !="'+pcmID+'"';

            return  db.sequelize.query(sql_query)
                .then(function (data) {
                    console.log(data);
                    response.send({success: true, preferences: data});
                });
        },


        getPaperPreferences: function(request, response) {
            PaperPreferenceModel.findAll()
                .then(function(paperPreference){
                    response.send(paperPreference);
                });
        },

        setPaperPreference: function(req, res) {

            PaperPreferenceModel.create({
                PCMID: req.body.params.pcmid, //change this
                SubmissionID: req.body.params.submissionId //change this
            })
                .then(function(paperPreference) {
                    res.send(paperPreference);
                });
        }

    };

    module.exports = {
        init: init
    };

}());