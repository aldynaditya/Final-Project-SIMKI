const db = require('../../../db/index');
const { DataTypes } = require('sequelize');
const OrderObat = require('../orderObat/model');
const OrderSurat = require('../orderSurat/model');
const OrderProsedur = require('../orderProsedur/model');
const UserKlinik = require('../userKlinik/model');

const Transaksi = db.define('transaksi', {
    uuid:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    metodeBayar:{
        type: DataTypes.ENUM( 'cash','bank','none' ),
        allownull: false,
        defaultValue: 'none',
    },
    diskon:{
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
    },
    total:{
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
    },
    keterangan:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '-'
    },
    status: {
        type: DataTypes.ENUM( 'Awaiting Payment','Completed' ),
        defaultValue: 'Awaiting Payment',
    },
    orderobatId: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    ordersuratId: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    orderprosedurId: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    }  
}, {
    timestamps: true,
    tableName: 'transaksi'
});


Transaksi.belongsTo(OrderSurat, {
    foreignKey: 'ordersuratId',
    targetKey: 'uuid',
    as: 'ordersurat'
});

Transaksi.belongsTo(OrderObat, {
    foreignKey: 'orderobatId',
    targetKey: 'uuid',
    as: 'orderobat'
});

Transaksi.belongsTo(OrderProsedur, {
    foreignKey: 'orderprosedurId',
    targetKey: 'uuid',
    as: 'orderprosedur'
});

Transaksi.belongsTo(UserKlinik, {
    foreignKey: 'userId',
    targetKey: 'uuid',
    as: 'user'
});

module.exports = Transaksi;