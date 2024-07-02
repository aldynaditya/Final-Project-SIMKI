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
            notEmpty: true,
            len : [3,100]
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
    stok:{
        type: DataTypes. INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    }  
}, {
    timestamps: true,
    tableName: 'item'
});

Item.belongsTo(UserKlinik, {
    foreignKey: 'userId',
    targetKey: 'uuid',
    as: 'user'
});

module.exports = Item;