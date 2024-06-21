const db = require('../../../db/index');
const { DataTypes } = require('sequelize');
const OrderObat = require('../orderObat/model');
const OrderSurat = require('../orderSurat/model');
const OrderProsedur = require('../orderProsedur/model');
const UserKlinik = require('../userKlinik/model');

const Transaksi = db.define('transaksi', {
    noFaktur:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    metodeBayar:{
        type: DataTypes.ENUM( 'cash','bank' ),
        allownull: false,
        validate: {
            isIn: {
                args: [[ 'cash','bank' ]],
                msg: 'Pilihan tidak valid',
            },
        },
    },
    diskon:{
        type: DataTypes.INTEGER,
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
    orderobatId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    ordersuratId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    orderprosedurId: {
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