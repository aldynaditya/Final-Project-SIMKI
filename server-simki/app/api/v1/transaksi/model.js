const db = require('../../../db/index');
const { DataTypes } = require('sequelize');
const OrderObat = require('../orderObat/model');
const OrderSurat = require('../orderSurat/model');
const OrderProsedur = require('../orderProsedur/model');
const Episode = require('../episode/model');
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
    metode_bayar:{
        type: DataTypes.ENUM( 'cash','bank','none' ),
        allownull: false,
        defaultValue: 'none',
    },
    diskon:{
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
    },
    total_order:{
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
    episodeId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
    }, 
    userKlinikId: {
        type: DataTypes.UUID,
        allowNull: false,
    }  
}, {
    timestamps: true,
    tableName: 'transaksi'
});

Transaksi.belongsTo(Episode, {
    foreignKey: 'episodeId',
    targetKey: 'uuid',
    as: 'episode'
});

Transaksi.belongsTo(UserKlinik, {
    foreignKey: 'userKlinikId',
    targetKey: 'uuid',
    as: 'user'
});

module.exports = Transaksi;