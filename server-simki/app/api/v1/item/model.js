const db = require('../../../db/index');
const { DataTypes } = require('sequelize');
const UserKlinik = require('../userKlinik/model');

const Item = db.define('item', {
    uuid:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    nama_item:{
        type: DataTypes. STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    kode_item:{
        type: DataTypes. STRING,
        allowNull: false,
        unique: {
            msg: 'Kode sudah digunakan',
        },
        validate: {
            notEmpty: true,
        }
    },
    harga_satuan_item:{
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
    tableName: 'item'
});

Item.belongsTo(UserKlinik, {
    foreignKey: 'userKlinikId',
    targetKey: 'uuid',
    as: 'user'
});

module.exports = Item;