const db = require('../../../db/index');
const { DataTypes } = require('sequelize');
const UserKlinik = require('../userKlinik/model');

const Obat = db.define('obat', {
    uuid:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    nama_obat:{
        type: DataTypes. STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    kode_obat:{
        type: DataTypes. STRING,
        allowNull: false,
        unique: {
            msg: 'Kode sudah digunakan',
        },
        validate: {
            notEmpty: true,
        }
    },
    harga_satuan_obat:{
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    satuan:{
        type: DataTypes. STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    stok:{
        type: DataTypes. INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    userKlinikId: {
        type: DataTypes.UUID,
        allowNull: false,
    }  
}, {
    timestamps: true,
    tableName: 'obat'
});

Obat.belongsTo(UserKlinik, {
    foreignKey: 'userKlinikId',
    targetKey: 'uuid',
    as: 'user'
});

module.exports = Obat;