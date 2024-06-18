const db = require('../../../db/index');
const { DataTypes } = require('sequelize');
const EMRPasien = require('../emrPasien/model');

const Episode = db.define('episode', {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    emrPasienId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: EMRPasien,
            key: 'noEMR',
        },
    },
    riwayatPenyakit: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    subjective: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    TD: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    indeks: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    detak: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    suhu: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    napas: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    objective: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    assessment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    plan: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'episode',
});

Episode.belongsTo(EMRPasien, { foreignKey: 'emrPasienId' });
EMRPasien.hasMany(Episode, { foreignKey: 'emrPasienId' });

module.exports = Episode;
