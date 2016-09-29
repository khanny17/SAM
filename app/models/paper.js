var User = require('user');
var Submission = require('submission');

module.exports = function(sequelize, DataTypes) {
    var Paper = sequelize.define("paper", {
        ID: DataTypes.INTEGER,
        Title: DataTypes.STRING,
        Description: DataTypes.STRING,
        Document: DataTypes.BLOB,
        Version: DataTypes.INTEGER
    });
    
    Paper.belongsTo(User, { as: 'ContactAuthor' });
    Paper.belongsTo(Submission);
    
    return PaperModel;
};
