(function () {
    'use strict';

    module.exports = function(sequelize, DataTypes) {
        var Notification = sequelize.define("notification", {
            Viewed: DataTypes.BOOLEAN,
            Text: DataTypes.STRING
        }, 
        
        {
            classMethods: 
            {
                associate: function(models){
                    Notification.belongsTo(models.user, { as: 'user' } );
                }

            }
        });

        return Notification;

    };

}());
