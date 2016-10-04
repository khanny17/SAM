//app/api/user.js

(function () {
    'use strict';

    var db = require('../models/db');
    var UserModel = db.user;


    var init = function(router) {
        
        router.get('/get-users', endpoints.getUsers);

    };

    var endpoints = {

        getUsers: function(request, response) {
            UserModel.findAll()
            .then(function(users){
                response.send(users);
            });
        }

    };

    module.exports = {
        init: init
    };

}());
