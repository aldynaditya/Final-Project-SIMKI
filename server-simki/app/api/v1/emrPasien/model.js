const db = require('../../../db/index');
const { DataTypes } = require('sequelize');
const Appointment = require('../appointment/model');
const DataPasien = require('../dataPasien/model');

const EMRPasien = db.define('emrPasien', {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: false,
        },
    },
    noEMR: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    appointmentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Appointment,
            key: 'uuid',
        },
    },
    pasienId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: DataPasien,
            key: 'uuid',
        },
    },
    status: {
        type: DataTypes.ENUM,
        values: ['active', 'finished'],
        defaultValue: 'active',
        allowNull: false,
    },
    finishedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    tableName: 'emrPasien',
});

EMRPasien.belongsTo(Appointment, { foreignKey: 'appointmentId' });
EMRPasien.belongsTo(DataPasien, { foreignKey: 'pasienId' });

module.exports = EMRPasien;
