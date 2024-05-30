const db = require('../../../db/index');
const { DataTypes } = require('sequelize');

const Role = db.define('Role', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

const Permission = db.define('Permission', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

module.exports = { Role, Permission};