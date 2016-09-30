'use strict';

// Modules 
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var Sequelize      = require('sequelize');

// Configuration
    
// Server port
var port = process.env.PORT || 8080; 

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 



// --- Api Routes --- 

var api = [
    //{ route: 'example', file: require(__dirname + '/app/api/example') },
];

//Mounts routes for each api service in the above list
api.forEach(function(service){
    var router = express.Router();      //Create a new Router object
    service.file.init(router);           //Initialize the endpoints
    app.use('/api/' + service.route, router); //Mount sub-api
});

// ------------------

// --- Sequelize ---
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
    models[name] = sequelize.import(__dirname + '/app/models/' + name);
});

//Call associate on each model so they can set up foreign key relations
for (var model in models) {
    if(models.hasOwnProperty(model)) {
        if(model.classMethods && model.classMethods.hasOwnProperty('associate')) {
            model.classMethods.associate(models);
        }
    }
}

//--------------------



// Start App 
app.listen(port);               

console.log('Server running on ' + port);
