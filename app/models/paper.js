(function () {
    'use strict';

    module.exports = function(sequelize, DataTypes) {
        var Paper = sequelize.define("paper", {
            Title: {
                type: DataTypes.STRING,
                required: true
            },
            Description: DataTypes.STRING,
            Document: DataTypes.BLOB,
            Version: DataTypes.INTEGER
        }, 
        
        {
        
            classMethods: 
            {
                associate: function(models){
                    Paper.belongsTo(models.User, { as: 'ContactAuthor' });
                }
            }
        
        });

        return Paper;

    };

}());
