(function () {
    'use strict';

    module.exports = function(sequelize, DataTypes) {
        var Paper = sequelize.define("paper", {
            CurrentVersion: DataTypes.FLOAT,
            Status: DataTypes.ENUM('Pending Submission','Submitted','Review Pending','Review In-Progress','Review Conflict','Review Complete')
        },

        {
            classMethods:
            {
                associate: function(models){
                    Paper.belongsTo(models.user, { as: 'userID' } );
                    Paper.hasMany(models.paperVersion);
                    Paper.hasMany(models.submission);
                }

            }
        });

        return Paper;

    };

}());
