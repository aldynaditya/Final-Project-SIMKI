const db = require('../../../db/index');
const { DataTypes } = require('sequelize');
const UserKlinik = require('../userKlinik/model')

const SuratSakit = db.define('surat_sakit', {
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
    periodeStart: {
        type: DataTypes.DATE,
        allowNull: false
    },
    periodeEnd: {
        type: DataTypes.DATE,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    }   
}, {
    timestamps: true,
    tableName: 'surat_sakit'
});

SuratSakit.belongsTo(UserKlinik, {
    foreignKey: 'userId',
    targetKey: 'uuid',
    as: 'user'
});

module.exports = SuratSakit;