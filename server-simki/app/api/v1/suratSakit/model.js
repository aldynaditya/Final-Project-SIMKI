const db = require('../../../db/index');
const { DataTypes } = require('sequelize');
const UserKlinik = require('../userKlinik/model')

const SuratSakit = db.define('suratSakit', {
    uuid:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    umur:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    pekerjaan:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    diagnosis:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    periode_start: {
        type: DataTypes.DATE,
        allowNull: false
    },
    periode_end: {
        type: DataTypes.DATE,
        allowNull: false
    },
    userKlinikId: {
        type: DataTypes.UUID,
        allowNull: false,
    }   
}, {
    timestamps: true,
    tableName: 'suratSakit'
});

SuratSakit.belongsTo(UserKlinik, {
    foreignKey: 'userKlinikId',
    targetKey: 'uuid',
    as: 'user'
});

module.exports = SuratSakit;