const db = require('../../../db/index');
const { DataTypes } = require('sequelize');

const Dokter = db.define('dokter', {
    uuid:{
        type: DataTypes. STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name:{
        type: DataTypes. STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len : [3,100]
        }
    },
}, {
    timestamps: true
});

module.exports = Dokter;