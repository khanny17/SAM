(function () {
    'use strict';

    module.exports = function(sequelize, DataTypes) {
        var submission = sequelize.define("submission", {
            PCC : DataTypes.INTEGER,
            Reviewer1 : DataTypes.INTEGER,
            Reviewer2 : DataTypes.INTEGER,
            Reviewer3 : DataTypes.INTEGER
        },
        {
          classMethods : {
            associate : function(models){
              submission.belongsTo(models.paper,{as : 'PaperID'});
            }
          }
        }

      );
      return submission;
    };
}());
