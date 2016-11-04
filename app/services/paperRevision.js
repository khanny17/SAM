//app/api/paperRevision.js
(function () {
    'use strict';

    var db = require('../models/db');
    var PaperRevisionModel = db.paperRevision;

    var init = function(router) {
        router.get('/get-paper-revisions', endpoints.getPaperRevisions);
        router.post('/create-paper-revision', endpoints.createPaperRevision);
    };

    var endpoints = {

        getPaperRevisions: function(request, response) {
            PaperRevisionModel.findAll()
                .then(function(paperRevisions){
                    response.send(paperRevisions);
                });
        },

        createPaperRevision: function(req, res) {
            PaperRevisionModel.create(req.body)
                .then(function(paperRevision) {
                    console.log('Paper Revision ID: ' + paperRevision.id + ' for Paper: '+ paperRevision.paperID +'created');
                    res.send(paperRevision);
                });
        }

    };

    module.exports = {
        init: init
    };

}());
