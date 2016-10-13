'use strict';

// Modules 
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// Configuration
    
// Server port
var port = process.env.PORT || 8080; 

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.services+json as json
app.use(bodyParser.json({ type: 'application/vnd.services+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 



// --- Api Routes --- 

var api = [
    { route: 'user', file: require(__dirname + '/app/services/user') },
    { route: 'paper', file: require(__dirname + '/app/services/paper') },
    { route: 'paperPreference', file: require(__dirname + '/app/services/paperPreference') }
];

//Mounts routes for each services service in the above list
api.forEach(function(service){
    var router = express.Router();      //Create a new Router object
    service.file.init(router);           //Initialize the endpoints
    app.use('/services/' + service.route, router); //Mount sub-services
});

// ------------------

// --- Sequelize ---
require(__dirname + '/app/models/db');
//--------------------


// --- Send Single Page Application for all other routes ---
// Since we route on the frontend, every route except for our services routes should just send
// index.html. Our frontend JS will handle the routing from there
app.get('*', function(req, res) {
    res.sendfile(__dirname + '/public/index.html'); 
});


// Start App on the port 
app.listen(port);               

console.log('Server running on ' + port);
