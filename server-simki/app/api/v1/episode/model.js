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
    riwayat_penyakit: {
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
        type: DataTypes.TEXT,
        defaultValue: '["none"]',
        get() {
            const rawValue = this.getDataValue('tindakan');
            return JSON.parse(rawValue);
        },
        set(value) {
            this.setDataValue('tindakan', JSON.stringify(value));
        },
        allowNull: false,
    },
    invoiceNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'episode',
});

Episode.belongsTo(EMRPasien, { foreignKey: 'emrPasienId' });
EMRPasien.hasMany(Episode, { foreignKey: 'emrPasienId' });

module.exports = Episode;
