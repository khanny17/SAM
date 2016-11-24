(function () {
    'use strict';
    module.exports = function(sequelize, DataTypes) {
        var deadline = sequelize.define("deadline", {
                ID: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                Deadline : DataTypes.STRING,
                Date : DataTypes.DATE
            });
        return deadline;
    };
}());
