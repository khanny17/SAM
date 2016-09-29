module.exports = function(sequelize, DataTypes) {
    return sequelize.define("paper", {
        Title: DataTypes.STRING,
        Description: DataTypes.STRING,
        ID: DataTypes.INTEGER,
        Document: DataTypes.BLOB,
        Version: DataTypes.INTEGER
    });
};
