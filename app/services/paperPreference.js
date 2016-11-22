//app/api/paperPreference.js
(function () {
    'use strict';

    var db = require('../models/db');
    var PaperPreferenceModel = db.paperPreference;

    var init = function(router) {
        router.get('/get-paperPreferences', endpoints.getPaperPreferences);
        router.post('/set-paper-preference', endpoints.setPaperPreference);
    };

    var endpoints = {

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