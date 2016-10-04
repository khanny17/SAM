//app/models/db.js
(function () {
    'use strict';

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

    //Add the name of your model to this array and it will be included by sequelize
    var models = {};
    var modelNames = [
        'user',
        'paper'
    ];

    //Go through each name and import the required models
    modelNames.forEach(function(name){
        models[name] = sequelize.import(name);
    });

    //Call associate on each model so they can set up foreign key relations
    for (var model in models) {
        if(models.hasOwnProperty(model)) {
            if(model.classMethods && model.classMethods.hasOwnProperty('associate')) {
                model.classMethods.associate(models);
            }
        }
    }


    module.exports = models;

}());
