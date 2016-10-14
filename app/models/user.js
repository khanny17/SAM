(function () {
    'use strict';

    var bcrypt = require('bcrypt-nodejs');

    module.exports = function(sequelize, DataTypes) {
        var User = sequelize.define("user", {
            FirstName: DataTypes.STRING,
            LastName: DataTypes.STRING,
            Email: {
                type: DataTypes.STRING,
                unique: true,
                required: true,
                validate: {
                    isEmail: true
                }
            },

            Password:DataTypes.STRING,

            ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
        }, {

            classMethods: {

                hashPassword: function(password) { 
                    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                },

            },
        
            instanceMethods: {
                
                comparePassword: function(password, callback) {
                    return bcrypt.compare(password, this.Password, callback);
                }
            }

        });

        return User;
    };
}());
