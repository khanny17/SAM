(function () {
    'use strict';

    module.exports = function(sequelize/*, DataTypes*/) {
        var submission = sequelize.define("submission", {
            // PCC : DataTypes.INTEGER,
            // Reviewer1 : DataTypes.INTEGER,
            // Reviewer2 : DataTypes.INTEGER,
            // Reviewer3 : DataTypes.INTEGER
        },
        {
          classMethods : {
            associate : function(models){
              submission.belongsTo(models.paper,{as : 'PaperID'});
              submission.belongsTo(models.user,{as : 'PCC'});
              submission.belongsTo(models.user,{as : 'Reviewer1'});
              submission.belongsTo(models.user,{as : 'Reviewer2'});
              submission.belongsTo(models.user,{as : 'Reviewer3'});
            }
          }
        }

      );
      return submission;
    };
}());
