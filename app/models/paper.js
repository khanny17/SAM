(function () {
    'use strict';

    module.exports = function(sequelize, DataTypes) {
        var Paper = sequelize.define("paper", {
            Title: {
                type: DataTypes.STRING,
                required: true
            },
            ContributingAuthors: DataTypes.STRING,
            Description: DataTypes.STRING,
            Document: DataTypes.BLOB,
            Version: DataTypes.INTEGER,
            CurrentVersion: DataTypes.FLOAT,
            Status: DataTypes.ENUM('Pending Submission','Submitted','Review Pending','Review In-Progress','Review Conflict','Review Complete')
        }, 
        
        {
            classMethods: 
            {
                associate: function(models){
                    Paper.belongsTo(models.user);
                }
            }
        });

        return Paper;

    };

}());
