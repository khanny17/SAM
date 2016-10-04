//app/models/db.js
(function () {
    'use strict';

    var fs        = require("fs");
    var path      = require("path");
    var Sequelize = require('sequelize');

    var sequelize = new Sequelize('swen_745', 'b70785980f9954', '608a8b63', {
        host: 'us-cdbr-azure-east-c.cloudapp.net',
        dialect: 'mysql',

        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });

    sequelize
        .authenticate()
        .then(function() {
            console.log('Connection has been established successfully.');
        })
        .catch(function (err) {
            console.log('Unable to connect to the database:', err);
        });



    // --- Models ---

    var db = {};

    //Go through every file in this directory except this one
    fs
        .readdirSync(__dirname)
        .filter(function(file) {
            return (file.indexOf(".") !== 0) && (file !== "db.js");
        })
        .forEach(function(file) {
            var model = sequelize.import(path.join(__dirname, file));
            db[model.name] = model;
        });

    Object.keys(db).forEach(function(modelName) {
        if ("associate" in db[modelName]) {
            db[modelName].associate(db);
        }
    });

    //Now lets actually create the tables on the db
    sequelize
        .sync({ force: true })
        .then(function() {
            console.log('Tables Created');
        }, function (err) { 
            console.log('An error occurred while creating the table:', err);
        });

    module.exports = db;

}());
