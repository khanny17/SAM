//app/api/paperPreference.js
(function () {
    'use strict';

    var db = require('../models/db');
    var PaperPreferenceModel = db.paperPreference;

    var init = function(router) {
        router.get('/get-paperPreferences', endpoints.getPaperPreferences);
        router.post('/create-paperPreferences', endpoints.createPaperPreferences);
    };

    var endpoints = {

        getPaperPreferences: function(request, response) {
            PaperPreferenceModel.findAll()
                .then(function(paperPreference){
                    response.send(paperPreference);
                });
        },

        createPaperPreferences: function(req, res) {

            PaperPreferenceModel.create({
                PCMID: res.body.pcmid, //change this
                SubmissionId: res.body.submissionId //change this
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