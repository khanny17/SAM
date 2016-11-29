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
            router.post('/submit-pcm-review', endpoints.submitReview);
            router.get('/get-my-review-by-submission-id', endpoints.getMyReviewBySubmissionId);
            router.get('/get-all-reviews-by-submission-id', endpoints.getAllReviewsBySubmissionId);
            router.get('/download-document', endpoints.downloadDocument);
        };

        var endpoints = {

            downloadDocument: function (request, response) {
                var fileName = request.query.fileName;
                return Review.findOne({
                    where: {
                        ID: request.query.id
                    }
                }).then(function (data) {
                    response.send({
                        file: "" + data.Document,
                        fileName: fileName + '.' + data.PaperFormat
                    });
                });
            },


            getMyReviewBySubmissionId: function (request, response) {
                var review_submissionID = request.query.submissionId;
                var review_pcmID = request.query.userID;
                console.log('------------------------------------------------------------------');
                console.log(review_submissionID);
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
                 reviews.ID                        AS "ReviewId",
                 reviews.Rating                    AS "ReviewRating",
                 reviews.Comment                   AS "ReviewComment",
                 reviews.PCMID                     AS "ReviewPCMId",
                 reviews.createdAt                 AS "ReviewCreatedAt",
                 reviews.Document                  AS "ReviewDocument",
                 reviews.PaperFormat               AS "ReviewPaperFormat",
                 users.FirstName                   AS "UserFirstName",
                 users.LastName                    AS "UserLastName",
                 users.Email                       AS "UserEmail"

                 FROM paperVersions
                 INNER JOIN papers ON (paperVersions.paperId = papers.id AND paperVersions.Version = papers.CurrentVersion)
                 INNER JOIN submissions ON (papers.id = submissions.paperId)
                 INNER JOIN reviews ON (reviews.submissionID = submissions.ID)
                 INNER JOIN users ON (users.ID = papers.userID)
                 WHERE submissions.ID = "21" AND PCMID="51" // <---NOTE: Change these values
                 */
                var sql_query = 'SELECT paperversions.paperId AS "PaperId", paperversions.ID AS "PaperVersionId", submissions.ID AS "SubmissionId", papers.CurrentVersion AS "CurrentVersion", papers.Status AS "PaperStatus", papers.userID AS "PaperAuthor", papers.createdAt AS "OriginalCreatedAt", paperversions.Title AS "PaperTitle", paperversions.ContributingAuthors AS "PaperContibutingAuthors", paperversions.Description AS "PaperDescription", paperversions.Document AS "PaperDocument", paperversions.PaperFormat AS "PaperFormat", paperversions.createdAt AS "VersionCreatedAt", submissions.PCCID AS "SubmissionPCCId", submissions.Reviewer1ID AS "SubmissionReviewer1Id", submissions.Reviewer2ID AS "SubmissionReviewer2Id", submissions.Reviewer3ID AS "SubmissionReviewer3Id", submissions.createdAt AS "SubmissionCreatedAt", reviews.ID AS "ReviewId", reviews.Rating AS "ReviewRating", reviews.Comment AS "ReviewComment", reviews.PCMID AS "ReviewPCMId", reviews.createdAt AS "ReviewCreatedAt",reviews.Document AS "ReviewDocument", reviews.PaperFormat AS "ReviewPaperFormat",users.FirstName AS "UserFirstName",users.LastName AS "UserLastName", users.Email AS "UserEmail" ' +
                    'FROM paperVersions ' +
                    'INNER JOIN papers ON (paperVersions.paperId = papers.id AND paperVersions.Version = papers.CurrentVersion) ' +
                    'INNER JOIN submissions ON (papers.id = submissions.paperId) ' +
                    'INNER JOIN reviews ON (reviews.submissionID = submissions.ID) ' +
                    'INNER JOIN users ON (users.ID = papers.userID)' +
                    'WHERE submissions.ID = "'+review_submissionID+'" AND PCMID="'+review_pcmID+'"';

                return db.sequelize.query(sql_query)
                .then(function (data) {
                    response.send({success: true, review: data});
                });
            },

            getAllReviewsBySubmissionId: function (request, response) {
                var review_submissionID = request.query.submissionId;
                var review_pcmID = request.query.userID;
                console.log('------------------------------------------------------------------');
                console.log(review_submissionID);
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
                 reviews.ID                        AS "ReviewId",
                 reviews.Rating                    AS "ReviewRating",
                 reviews.Comment                   AS "ReviewComment",
                 reviews.PCMID                     AS "ReviewPCMId",
                 reviews.createdAt                 AS "ReviewCreatedAt",
                 reviews.Document                  AS "ReviewDocument",
                 reviews.PaperFormat               AS "ReviewPaperFormat",
                 users.FirstName                   AS "UserFirstName",
                 users.LastName                    AS "UserLastName",
                 users.Email                       AS "UserEmail"

                 FROM paperVersions
                 INNER JOIN papers ON (paperVersions.paperId = papers.id AND paperVersions.Version = papers.CurrentVersion)
                 INNER JOIN submissions ON (papers.id = submissions.paperId)
                 INNER JOIN reviews ON (reviews.submissionID = submissions.ID)
                 INNER JOIN users ON (users.ID = papers.userID)
                 WHERE submissions.ID = "21" // <---NOTE: Change these values
                 */
                var sql_query = 'SELECT paperversions.paperId AS "PaperId", paperversions.ID AS "PaperVersionId", submissions.ID AS "SubmissionId", papers.CurrentVersion AS "CurrentVersion", papers.Status AS "PaperStatus", papers.userID AS "PaperAuthor", papers.createdAt AS "OriginalCreatedAt", paperversions.Title AS "PaperTitle", paperversions.ContributingAuthors AS "PaperContibutingAuthors", paperversions.Description AS "PaperDescription", paperversions.Document AS "PaperDocument", paperversions.PaperFormat AS "PaperFormat", paperversions.createdAt AS "VersionCreatedAt", submissions.PCCID AS "SubmissionPCCId", submissions.Reviewer1ID AS "SubmissionReviewer1Id", submissions.Reviewer2ID AS "SubmissionReviewer2Id", submissions.Reviewer3ID AS "SubmissionReviewer3Id", submissions.createdAt AS "SubmissionCreatedAt", reviews.ID AS "ReviewId", reviews.Rating AS "ReviewRating", reviews.Comment AS "ReviewComment", reviews.PCMID AS "ReviewPCMId", reviews.createdAt AS "ReviewCreatedAt",reviews.Document AS "ReviewDocument", reviews.PaperFormat AS "ReviewPaperFormat",users.FirstName AS "UserFirstName",users.LastName AS "UserLastName", users.Email AS "UserEmail" ' +
                    'FROM paperVersions ' +
                    'INNER JOIN papers ON (paperVersions.paperId = papers.id AND paperVersions.Version = papers.CurrentVersion) ' +
                    'INNER JOIN submissions ON (papers.id = submissions.paperId) ' +
                    'INNER JOIN reviews ON (reviews.submissionID = submissions.ID) ' +
                    'INNER JOIN users ON (users.ID = papers.userID)' +
                    'WHERE submissions.ID = "'+review_submissionID+'"';

                return db.sequelize.query(sql_query)
                    .then(function (data) {
                        response.send({success: true, reviews: data});
                    });
            },

            submitReview: function (request, response) {
                var review_id = request.body.params.review_id;
                var review_rating = request.body.params.review_rating;
                var review_comment = request.body.params.review_comment;
                var review_document = request.body.params.review_document;
                var review_paperFormat = request.body.params.review_paperFormat;
                var review_submissionID = request.body.params.review_submissionID;
                var review_pcmID = request.body.params.review_pcmID;
                var paper_id = request.body.params.paper_id;

                /*
                if (review_id == undefined || review_id == null || review_id==''){

                    var sql_updateReview = " INSERT INTO reviews (Rating, Comment, submissionID, PCMID, createdAt, updatedAt) " +
                        "VALUES ('"+review_rating+"','"+review_comment+"','"+review_submissionID+"','"+review_pcmID+"',"+Date()+","+Date()+")";

                }
                else{
                    var sql_updateReview = " INSERT OR REPLACE INTO reviews (ID, Rating, Comment, submissionID, PCMID) " +
                        "VALUES ("+review_id+",'"+review_rating+"','"+review_comment+"','"+review_submissionID+"','"+review_pcmID+"')";
                }
                */


                return Review.upsert({
                    ID: review_id,
                    Rating:review_rating,
                    Comment:review_comment,
                    submissionID:review_submissionID,
                    PCMID:review_pcmID,
                    Document:review_document,
                    PaperFormat:review_paperFormat
                })
                    .then(function (data) {
                        return PaperModel.update({
                            Status:'Review In-Progress'
                        },{ where: {id: paper_id} })
                            .then(function(paper) {
                                response.send({success: true, review: data});
                        });
                });
            }
        };

        module.exports = {
            init: init
        };

    }()
);
