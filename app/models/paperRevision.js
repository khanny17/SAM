(function(){
    'use strict';

    module.exports = function(sequelize, DataTypes){
        var PaperRevision = sequelize.define("paperRevision", {
                ID: {
                    type: DataTypes.INTEGER,
                    primaryKey: true
                },
                Document: DataTypes.BLOB,
                Version: DataTypes.INTEGER,
            },
            {
                classMethods:
                {
                    associate: function(models){
                        PaperRevision.belongsTo(models.paper);
                    }
                }
            });

        return PaperRevision;

    };


}());
