const db = require('../../../db/index');
const { DataTypes } = require('sequelize');
const Appointment = require('../appointment/model');

const EMRPasien = db.define('emrPasien', {
    noEMR: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    appointmentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Appointment,
            key: 'uuid',
        },
    },
}, {
    tableName: 'emrPasien',
});

EMRPasien.belongsTo(Appointment, { foreignKey: 'appointmentId' });

module.exports = EMRPasien;
