(function(){
    'use strict';

    module.exports = function(sequelize, DataTypes){
        var PaperVersion = sequelize.define("paperVersion", {
                ID: {
                    type: DataTypes.INTEGER,
                    primaryKey: true
                },
                Title: {
                    type: DataTypes.STRING,
                    required: true
                },
                ContributingAuthors: DataTypes.STRING,
                Description: DataTypes.STRING,
                Document: DataTypes.BLOB,
                Version: DataTypes.INTEGER,
            },
            {
                classMethods:
                {
                    associate: function(models){
                        PaperVersion.belongsTo(models.paper);
                    }
                }
            });

        return PaperVersion;

    };


}());
