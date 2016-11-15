(function () {
    'use strict';

    var bcrypt = require('bcrypt-nodejs');

    module.exports = function(sequelize, DataTypes) {
        var User = sequelize.define("user", {
            FirstName: DataTypes.STRING,
            LastName: DataTypes.STRING,
            Role: DataTypes.ENUM('Author','PCC','PCM','Admin'),
            Email: {
                type: DataTypes.STRING,
                unique: true,
                required: true,
                validate: {
                    isEmail: true
                }
            },

            Password:DataTypes.STRING(60),

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

                associate: function(models) {
                    User.hasMany(models.paper, {as: 'papers'});

                    User.hasMany(models.review, {as: 'PCM', foreignKey: 'PCMID'});

                    User.hasMany(models.submission,{as : 'PCC', foreignKey: 'PCCID'});
                    User.hasMany(models.submission,{as : 'Reviewer1', foreignKey: 'Reviewer1ID'});
                    User.hasMany(models.submission,{as : 'Reviewer2',foreignKey: 'Reviewer2ID' });
                    User.hasMany(models.submission,{as : 'Reviewer3', foreignKey: 'Reviewer3ID'});
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
