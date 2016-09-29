module.exports = function(sequelize, DataTypes) {
    return sequelize.define("user", {
        FirstName: DataTypes.STRING,
        LastName: DataTypes.STRING,
        ID: DataTypes.INTEGER
    });
};