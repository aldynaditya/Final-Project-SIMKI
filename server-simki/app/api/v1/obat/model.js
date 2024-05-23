const db = require('../../../db/index');
const { DataTypes } = require('sequelize');

const Obat = db.define('obat', {
    uuid:{
        type: DataTypes. STRING,
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
            notEmpty: true,
            len : [3,100]
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
        type: DataTypes. INTEGER,
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
            len : [3,100]
        }
    },
    stok:{
        type: DataTypes. INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }   
}, {
    timestamps: true
});

module.exports = Obat;