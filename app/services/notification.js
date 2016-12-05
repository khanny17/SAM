(function () {
    'use strict';


    var io      = require('../../server');

    var db = require('../models/db');
    var Notification = db.notification;

    var init = function(router) {
        router.get('/get-notifications', endpoints.getNotifications);
        router.get('/has-notifications', endpoints.hasNotifications);
        router.post('/create-notification', endpoints.createNotifications);
    };

    var endpoints = {

        getNotifications: function(request, response) {
            return Notification.update(
            { Viewed: true },    
            {
                where:{
                    userID: request.query.userID
                }
            }).then(function(updatedRows){
                return Notification.findAll({
                    where: {
                        userID: request.query.userID
                    }
                });
            }).then(function(notifications){
                response.send(notifications);  
            });
        },

        hasNotifications: function(request, response) {
            return Notification.findAll({
                where:{
                    userID: request.query.userID,
                    Viewed:0
                }
            }).then(function(data){
                data.forEach(function(notification) {
                    if(notification.Viewed === false) {
                        return response.send(true);
                    }
                });
                response.send(false);
            });
        },

        createNotifications: function(request, response) {
            request.body.userIds.forEach(function(userId){
                Notification.create({
                    userID: userId,
                    Text: request.body.Text,
                    Viewed: false
                });

                console.log(global.clients);
                var socket = global.clients[userId];
                if (socket != undefined)
                    socket.emit('notification message', 'New Notification Alert! \n \n'+ request.body.Text + '\n \n');
            });

            response.send({success: true});
        }

    };

    module.exports = {
        init: init
    };

}());
