(function(){
    'use strict';

    module.exports = function(sequelize, DataTypes){
        var TemplateReview = sequelize.define("templateReview", {
                ID: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                Title: {
                    type: DataTypes.STRING,
                    required: true
                },
                Document: DataTypes.BLOB('long'),
                PaperFormat:DataTypes.ENUM('DOC','PDF', 'DOCX')
            });

        return TemplateReview;

    };


}());
