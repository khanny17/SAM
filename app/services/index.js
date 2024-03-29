/*
*  This module includes all of the service modules without having to include them individually
*/
(function(){
    'use strict';

    var fs = require('fs');
    var path = require('path');


    var init = function(express, app) {

        fs
            .readdirSync(__dirname)
            .filter(function(file) {
                return (file.indexOf(".") !== 0) && (file !== "index.js");
            })
            .forEach(function(file) {
                //For each api module, call init
                var router = express.Router();      //Create a new Router object
                var newEndpoint = require(path.join(__dirname, file));
                newEndpoint.init(router);           //Initialize the endpoints
                app.use('/services/' + path.basename(file, '.js'), router); //Mount sub-api
            });
    };

    module.exports = {
        init: init
    };

}());
