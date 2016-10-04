(function(){
    'use strict';

    module.exports = function(sequelize, DataTypes){
        var PaperPreference = sequelize.define("paperPreference", {
            ID: {
                type: DataTypes.INTEGER,
                primaryKey: true
            }
        },
            {
            classMethods:
            {
                associate: function(models){
                    PaperPreference.belongsTo(models.User, { as: 'PCM' });
                    PaperPreference.belongsTo(models.Submission, { as: 'SubmissionID' });
                }
            }
        });

        return PaperPreference;

    };


}());