//app/api/user.js

(function () {
    'use strict';

    var db = require('../models/db');
    var UserModel = db.user;


    var init = function(router) {
        router.get('/get-users', endpoints.getUsers);
        router.post('/create', endpoints.createUser);
    };

    var endpoints = {

        getUsers: function(request, response) {
            UserModel.findAll()
            .then(function(users){
                response.send(users);
            });
        },

        createUser: function(req, res) {
            UserModel.create({
                FirstName: req.body.firstName,
                LastName: req.body.lastName
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
