//app/api/paper.js
(function () {
        'use strict';

        var db = require('../models/db');

        var DeadlineModel = db.deadline;

        var init = function (router) {
            router.post('/update-deadline-by-id', endpoints.updateDeadlineById);
            router.get('/get-all-deadlines', endpoints.getAllDeadlines);
            router.post('/set-default-deadlines', endpoints.setDefaultDeadlines);
        };

        var endpoints = {

            getAllDeadlines: function (request, response) {
                return DeadlineModel.findAll()
                    .then(function(data) {
                        response.send({success: true, deadlines: data});
                    });
            },

            setDefaultDeadlines: function (request, response) {
                var date_value = new Date().toJSON().slice(0,10);

                return DeadlineModel.bulkCreate([
                    {Deadline:'Submission Deadline', Date: date_value},
                    {Deadline:'Review Deadline', Date: date_value},
                    {Deadline:'Review Selection Deadline', Date: date_value}
                ])
                    .then(function(data) {
                        response.send({success: true, deadlines: data});
                    });
            },

            updateDeadlineById: function (request, response) {
                var deadline_id = request.body.params.deadline_id;
                var deadline_date = request.body.params.deadline_date;
                var deadline_name = request.body.params.deadline_name;

                return DeadlineModel.upsert({
                    ID:deadline_id,
                    Deadline:deadline_name,
                    Date:deadline_date
                })
                    .then(function(data) {
                        response.send({success: true, deadlines: data});
                    });
            }
        };

        module.exports = {
            init: init
        };

    }()
);
