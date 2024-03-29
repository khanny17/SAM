'use strict';

// Modules 
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var passport       = require('passport');
var jwt            = require('jwt-simple');

var http = require('http').Server(app);
var io      = require('socket.io')(http);

global.io = io;

// Configuration
    
// Server port
var port = process.env.PORT || 8080;

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json({ limit: '50mb' })); 

// parse application/vnd.services+json as json
app.use(bodyParser.json({ type: 'application/vnd.services+json', limit: '50mb' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 



// Use the passport package in our application
require(__dirname + '/app/config/passport')(passport);
app.use(passport.initialize());


//Set up the api endpoints
require(__dirname + '/app/services/index').init(express, app);


// --- Sequelize ---
require(__dirname + '/app/models/db');


// --- Send Single Page Application for all other routes ---
// Since we route on the frontend, every route except for our services routes should just send
// index.html. Our frontend JS will handle the routing from there

app.get('*', function(req, res) {
   res.sendfile(__dirname + '/public/index.html');
});




// Start App on the port 
//app.listen(port);

global.clients = {};
io.on('connection', function(socket){
    console.log('socket: a user connected ->'+socket.handshake.query.userid);


    clients[socket.handshake.query.userid] = socket;

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});
http.listen(port, function(){
    console.log('listening on *:'+port);
})

console.log('Server running on ' + port);
