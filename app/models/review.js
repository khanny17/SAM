(function () {
    'use strict';
    module.exports = function(sequelize, DataTypes) {
        var review = sequelize.define("review", {
          ID: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
          Rating : DataTypes.INTEGER,
          Comment : DataTypes.STRING
        },
      {
        classMethods : {
          associate : function(models){
            review.belongsTo(models.submission);
            review.belongsTo(models.user, {as: 'PCM', foreignKey: 'PCMID'});
          }
        }
      });
      return review;
    };
}());
