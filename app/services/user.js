(function () {
    'use strict';

    var db        = require('../models/db');
    var jwt       = require('jwt-simple');
    var UserModel = db.user;
    var PaperModel = db.paper;

    var config = require('../config/database.js');


    var init = function(router) {
        router.post('/signup', endpoints.signup);
        router.post('/authenticate', endpoints.authenticate);
        router.get('/get-users', endpoints.getUsers);
        router.post('/update-roles',endpoints.updateRoles);
    };

    var endpoints = {

        getUsers: function(req, res) {
            UserModel.findAll({attributes: ['FirstName', 'LastName', 'Role', 'ID']})
                .then(function(users) {
                    console.log(users)
                    res.send(users);
            });
        },

        updateRoles: function(req, res) {

            var i = 0;
            var newPCM = req.body.params.newPCM;
            var newPCC = req.body.params.newPCC;

            UserModel.update({
                    Role: 'Author'
                }, {
                    where: ["Role = 'PCM' or Role = 'PCC'"]
                }
            );

            for (i = 0; i < newPCM.length; i++) {
                UserModel.update({
                        Role: 'PCM'
                    }, {
                        where: {
                            ID: newPCM[i]
                        }
                    }
                );
            }
            for (i = 0; i < newPCC.length; i++) {
                UserModel.update({
                        Role: 'PCC'
                    }, {
                        where: {
                            ID: newPCC[i]
                        }
                    }
                );
            }

            res.json({success: true});
        },

        signup: function(req, res) {
            if (!req.body.email || !req.body.password) {
                return res.json({success: false, msg: 'Please pass email and password.'});
            }

            UserModel.create({
                FirstName: req.body.firstName,
                LastName: req.body.lastName,
                Email:req.body.email,
                Password: UserModel.hashPassword(req.body.password),
                Role:'Author' //By default, a user is given an 'author' role when provisioned
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
                         user.Password = "";
                        // return the information including token as JSON
                        res.json({success: true, token: 'JWT ' + token, user: user});
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
