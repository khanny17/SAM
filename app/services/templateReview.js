//app/api/paper.js
(function () {
        'use strict';

        var db = require('../models/db');

        var TemplateReviewModel = db.templateReview;

        var init = function (router) {
            router.post('/set-template-review', endpoints.setTemplateReview);
            router.get('/get-template-review', endpoints.getTemplateReview);
            router.get('/download-document', endpoints.downloadDocument);
        };

        var endpoints = {

            downloadDocument: function (request, response) {
                return TemplateReviewModel.findOne({
                    where: {
                        ID: request.query.id
                    }
                }).then(function (data) {
                    response.send({
                        file: "" + data.Document,
                        fileName: data.Title + '.' + data.PaperFormat
                    });
                });
            },

            getTemplateReview: function (request, response) {
                return TemplateReviewModel.findAll()
                    .then(function (data) {
                        response.send({success: true, templates: data});
                    });
            },

            setTemplateReview: function (request, response) {
                var template_id = request.body.params.template_id;
                var template_title = request.body.params.template_title;
                var template_document = request.body.params.template_document;
                var template_paperFormat = request.body.params.template_paperFormat;

                return TemplateReviewModel.upsert({
                    ID: template_id,
                    Title: template_title,
                    Document: template_document,
                    PaperFormat: template_paperFormat
                }).then(function (data) {
                        response.send({success: true, template: data});
                    });
            }
        };

        module.exports = {
            init: init
        };

    }()
);
