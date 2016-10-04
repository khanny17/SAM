(function () {
    'use strict';
    module.exports = function(sequelize, DataTypes) {
        var review = sequelize.define("review", {
          Rating : DataTypes.INTEGER,
          Comment : DataTypes.STRING
        },
      {
        classMethods : {
          associate : function(models){
            review.belongsTo(models.submission,{as : 'SubmissionID'});
            review.belongsTo(models.user,{as : 'PCM'});
          }
        }
      });
      return review;
    };
}());
