const db = require('../../../db/index');
const { DataTypes } = require('sequelize');
const Transaksi = require('../transaksi/model');
const UserKlinik = require('../userKlinik/model');

const Laporan = db.define('laporan', {
    noLaporan:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    periode:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    keterangan:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    status: {
        type: DataTypes.ENUM('updated','not confirm', 'in process','confirm'),
        defaultValue: 'in process',
    },
    transaksiId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    }  
}, {
    timestamps: true,
    tableName: 'transaksi'
});


Laporan.belongsTo(Transaksi, {
    foreignKey: 'transaksiId',
    targetKey: 'uuid',
    as: 'transaksi'
});

Laporan.belongsTo(UserKlinik, {
    foreignKey: 'userId',
    targetKey: 'uuid',
    as: 'user'
});

module.exports = Laporan;