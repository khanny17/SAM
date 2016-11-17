(function () {
    'use strict';
    module.exports = function(sequelize, DataTypes) {
        var pcc_review = sequelize.define("PCCReview", {
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
                        pcc_review.belongsTo(models.submission);
                        pcc_review.belongsTo(models.user, {as: 'PCC', foreignKey: 'PCCID'});
                    }
                }
            });
        return pcc_review;
    };
}());
