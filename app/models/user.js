(function () {
    'use strict';

    module.exports = function(sequelize, DataTypes) {
        return sequelize.define("user", {
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
        });
    };
}());
