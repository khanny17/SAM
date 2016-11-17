(function () {
    'use strict';

    module.exports = function(sequelize, DataTypes) {
        var submission = sequelize.define("submission", {
                ID: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                }
        },
        {
          classMethods : {
            associate : function(models){
              submission.belongsTo(models.paper);
              submission.belongsTo(models.user,{as : 'PCC', foreignKey: 'PCCID'});
              submission.belongsTo(models.user,{as : 'Reviewer1', foreignKey: 'Reviewer1ID'});
              submission.belongsTo(models.user,{as : 'Reviewer2',foreignKey: 'Reviewer2ID' });
              submission.belongsTo(models.user,{as : 'Reviewer3', foreignKey: 'Reviewer3ID'});
              submission.hasMany(models.review);
              submission.hasMany(models.PCCReview);

            }
          }
        }

      );
      return submission;
    };
}());
