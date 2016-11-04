(function(){
    'use strict';

    module.exports = function(sequelize, DataTypes){
        var PaperVersion = sequelize.define("paperVersion", {
                ID: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                Title: {
                    type: DataTypes.STRING,
                    required: true
                },
                ContributingAuthors: DataTypes.STRING,
                Description: DataTypes.STRING,
                Document: DataTypes.BLOB,
                Version: DataTypes.FLOAT,
                PaperFormat:DataTypes.ENUM('DOC','PDF')
            },
            {
                classMethods:
                {
                    associate: function(models){
                        PaperVersion.belongsTo(models.paper);
                        PaperVersion.belongsTo(models.user);
                    }
                }
            });

        return PaperVersion;

    };


}());
