const db = require('../../../db/index');
const { DataTypes } = require('sequelize');
const Schedule = require('../schedule/model');
const DataPasien = require('../dataPasien/model');

const Appointment = db.define('appointment', {
    uuid:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    tanggal: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: { msg: 'Tanggal Buat Janji harus diisi' },
        },
    },
    keluhan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Keluhan harus diisi' },
        },
    },
    status: {
        type: DataTypes.ENUM('diterima', 'ditolak','diproses'),
        defaultValue: 'diproses',
    },
    penjamin: {
        type: DataTypes.ENUM('BPJS', 'NON BPJS'),
        defaultValue: 'BPJS',
    },
    keterangan: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
    },
    pasienId: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null
    },
    scheduleId: {
        type: DataTypes.UUID,
        allowNull: false,
    }
}, {
    timestamps: true,
    tableName: 'appointment'
});

Appointment.belongsTo(DataPasien, { as: 'datapasien', foreignKey: 'pasienId', targetKey: 'uuid' });

Appointment.belongsTo(Schedule, { as: 'schedule',foreignKey: 'scheduleId', targetKey: 'uuid' });

module.exports = Appointment;