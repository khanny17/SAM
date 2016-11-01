//app/api/paper.js
(function () {
    'use strict';

    var db = require('../models/db');
    var PaperModel = db.paper;

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
            PaperModel.findAll({
                where:{
                    userID:request.query.userID
                }
            })
            .then(function(papers){
                response.send(papers);
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
            PaperModel.findOne({
                where:{
                    userID:request.query.userID,
                    id:request.query.paperID
                }
            })
                .then(function(papers){
                    response.send(papers);
                });
        },

        createPaper: function(req, res) {
            console.log(req.body);
            PaperModel.create(req.body)
            .then(function(paper) {
                console.log('Paper ID: ' + paper.id + ' created');
                res.send(paper);
            });
        },

        updatePaper: function(req, res) {
            console.log(req.body);
            PaperModel.update({
                ContributingAuthors:req.body.ContributingAuthors,
                Description:req.body.Description,
                Title:req.body.Title
            },{ where: {id: req.body.id} })
                .then(function(paper) {
                    console.log('Paper ID: ' + paper.id + ' updated');
                    res.send(paper);
                });
        }

    };

    module.exports = {
        init: init
    };

}());
