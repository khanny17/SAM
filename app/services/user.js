(function () {
    'use strict';

    var db        = require('../models/db');
    var jwt       = require('jwt-simple');
    var UserModel = db.user;

    var config = require('../config/database.js');


    var init = function(router) {
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
                Password: UserModel.hashPassword(req.body.password)
            }).then(function(user) {
                delete user.Password;
                var msg = 'User ' + user.FirstName + ' ' + user.LastName + ' created successfully';
                console.log(msg);
                res.json({success: true, msg: msg});
            }).catch(function(error){
                var msg = 'The email address is already registered';
                res.json({success: false, msg: msg});
                console.log(error);
            });

        },

        authenticate: function(req, res) {
            UserModel.findAll({
                where: {
                    Email: req.body.email
                }
            }).then(function(users) {
                if(users.length > 1) {
                    console.log('Multiple users with same email');
                    res.send({success: false, msg: 'Multiple users with same email'});
                    return;
                }

                var user = users[0];

                if (!user) {
                    var msg = 'Authentication failed. User not found.';
                    console.log(msg);
                    return res.send({success: false, msg: msg});
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
            }).catch(function(error){
                console.log('uh oh' + error);
            });
        }

    };

    module.exports = {
        init: init
    };

}());
