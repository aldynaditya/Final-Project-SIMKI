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
            notEmpty: false,
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
    alergi: {
        type: DataTypes.STRING,
        defaultValue: "-",
        allowNull: false,
    },
    riwayatPenyakit: {
        type: DataTypes.TEXT,
        defaultValue: "-",
        allowNull: false,
    },
    subjective: {
        type: DataTypes.TEXT,
        defaultValue: "-",
        allowNull: false,
    },
    TD: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    indeks: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    detak: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    suhu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    napas: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    objective: {
        type: DataTypes.TEXT,
        defaultValue: "-",
        allowNull: false,
    },
    assessment: {
        type: DataTypes.TEXT,
        defaultValue: "-",
        allowNull: false,
    },
    plan: {
        type: DataTypes.TEXT,
        defaultValue: "-",
        allowNull: false,
    },
    tindakan: {
        type: DataTypes.ENUM( 'none', 'obat', 'prosedur', 'surat' ),
        defaultValue: 'none',
    }
}, {
    tableName: 'episode',
});

Episode.belongsTo(EMRPasien, { foreignKey: 'emrPasienId' });
EMRPasien.hasMany(Episode, { foreignKey: 'emrPasienId' });

module.exports = Episode;
