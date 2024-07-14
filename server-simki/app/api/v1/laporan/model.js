const db = require('../../../db/index');
const { DataTypes } = require('sequelize');
const UserKlinik = require('../userKlinik/model');

const Laporan = db.define('laporan', {
    uuid: {
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
    },
    no_laporan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    periode:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    keterangan: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'v1.0'
    },
    status: {
        type: DataTypes.ENUM('rejected','in process', 'accepted'),
        defaultValue: 'in process',
    },
    userKlinikId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    file_path: {
        type: DataTypes.STRING,
        allowNull: true,
    }  
}, {
    timestamps: true,
    tableName: 'laporan'
});

Laporan.belongsTo(UserKlinik, {
    foreignKey: 'userId',
    targetKey: 'uuid',
    as: 'user'
});

module.exports = Laporan;