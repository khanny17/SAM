//app/api/paper.js
(function () {
        'use strict';

        var db = require('../models/db');

        var DeadlineModel = db.deadline;

        var init = function (router) {
            router.post('/update-deadline-by-id', endpoints.updateDeadlineById);
            router.get('/get-all-deadlines', endpoints.getAllDeadlines);
            router.post('/set-default-deadlines', endpoints.setDefaultDeadlines);
            router.get('/get-is-deadline-passed', endpoints.getIsDeadlinePassed);
        };

        var endpoints = {

            getAllDeadlines: function (request, response) {
                return DeadlineModel.findAll()
                    .then(function (data) {
                        response.send({success: true, deadlines: data});
                    });
            },

            getIsDeadlinePassed: function (request, response) {
                try {
                    var deadline_name = request.query.deadline_name;
                    return DeadlineModel.findOne({
                        where: {
                            Deadline: deadline_name
                        }
                    })
                        .then(function (data) {
                            try {
                                var today_date = new Date().toJSON().slice(0, 10);
                                var deadline_date_value = Date.parse(data.Date);
                                var deadline_date = new Date(deadline_date_value).toJSON().slice(0, 10);

                                var firstValue = today_date.split('-');
                                var secondValue = deadline_date.split('-');

                                var firstDate = new Date();
                                firstDate.setFullYear(firstValue[0], (firstValue[1] - 1 ), firstValue[2]);

                                var secondDate = new Date();
                                secondDate.setFullYear(secondValue[0], (secondValue[1] - 1 ), secondValue[2]);

                                if (firstDate > secondDate) {
                                    response.send({success: true, status: true});
                                }
                                else {
                                    response.send({success: true, status: false});
                                }
                            }
                            catch(err){
                                response.send({success: false, status: false});
                            }

                        })
                }
                catch (err) {
                    response.send({success: false, status: false});
                }

            },

            setDefaultDeadlines: function (request, response) {
                var date_value = new Date().toJSON().slice(0, 10);

                return DeadlineModel.bulkCreate([
                    {Deadline: 'Submission Deadline', Date: date_value},
                    {Deadline: 'Review Deadline', Date: date_value},
                    {Deadline: 'Review Selection Deadline', Date: date_value}
                ])
                    .then(function (data) {
                        response.send({success: true, deadlines: data});
                    });
            },

            updateDeadlineById: function (request, response) {
                var deadline_id = request.body.params.deadline_id;
                var deadline_date = request.body.params.deadline_date;
                var deadline_name = request.body.params.deadline_name;

                return DeadlineModel.upsert({
                    ID: deadline_id,
                    Deadline: deadline_name,
                    Date: deadline_date
                })
                    .then(function (data) {
                        response.send({success: true, deadlines: data});
                    });
            }
        };

        module.exports = {
            init: init
        };

    }()
);
