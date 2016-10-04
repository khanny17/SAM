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
                    PaperPreference.belongsTo(models.user, { as: 'PCM' });
                    PaperPreference.belongsTo(models.submission, { as: 'SubmissionID' });
                }
            }
        });

        return PaperPreference;

    };


}());
