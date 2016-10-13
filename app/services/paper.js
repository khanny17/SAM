//app/api/paper.js
(function () {
    'use strict';

    var db = require('../models/db');
    var PaperModel = db.paper;

    var init = function(router) {
        router.get('/get-papers', endpoints.getPapers);
        router.post('/create-paper', endpoints.createPaper);
    };

    var endpoints = {

        getPapers: function(request, response) {
            PaperModel.findAll()
            .then(function(papers){
                response.send(papers);
            });
        },

        createPaper: function(req, res) {

            PaperModel.create(req.body)
            .then(function(paper) {
                console.log('Paper ID: ' + paper.id + ' created');
                res.send(paper);
            });
        }

    };

    module.exports = {
        init: init
    };

}());
