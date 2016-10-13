//app/api/user.js

(function () {
    'use strict';

    var db        = require('../models/db');
    var jwt       = require('jwt-simple');
    var UserModel = db.user;

    var config = require('../config/database.js');


    var init = function(router) {
        router.get('/get-users', endpoints.getUsers);
        router.post('/create', endpoints.createUser);
        router.post('/signup', endpoints.signup);
        router.post('/authenticate', endpoints.authenticate);
    };

    var endpoints = {

        signup: function(req, res) {
            if (!req.body.email || !req.body.password) {
                return res.json({success: false, msg: 'Please pass email and password.'});
            }

            UserModel.create({
                FirstName: req.body.firstName,
                LastName: req.body.lastName,
                Email:req.body.email,
                Password:req.body.password
            })

            .then(function(err) {
                if (err) {
                    return res.json({success: false, msg: 'Username already exists.'});
                }
                res.json({success: true, msg: 'Successful created new user.'});
            });

        },

        authenticate: function(req, res) {
            UserModel.findOne({
                email: req.body.email
            }, function(err, user) {
                if (err){
                    throw err;
                }

                if (!user) {
                    return res.send({success: false, msg: 'Authentication failed. User not found.'});
                }

                // check if password matches
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        // if user is found and password is right create a token
                        var token = jwt.encode(user, config.secret);
                        // return the information including token as JSON
                        res.json({success: true, token: 'JWT ' + token});
                    } else {
                        res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                    }
                });
            });
        },


        getUsers: function(request, response) {
            UserModel.findAll()
                .then(function(users){
                    response.send(users);
                });
        },

        createUser: function(req, res) {
            UserModel.create({
                FirstName: req.body.firstName,
                LastName: req.body.lastName,
                Email:req.body.email,
                Password:req.body.password
            })
                .then(function(user){
                    res.send(user);
                });
        }

    };

    module.exports = {
        init: init
    };

}());
