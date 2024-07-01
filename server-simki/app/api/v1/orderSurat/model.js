const db = require('../../../db/index');
const { DataTypes } = require('sequelize');
const SuratSakit = require('../suratSakit/model');
const SuratRujukan = require('../suratRujukan/model');
const Episode = require('../episode/model');

const OrderSurat = db.define('order_surat', {
    uuid:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    jenisSurat:{
        type: DataTypes.ENUM( 'sakit','rujukan' ),
        allownull: false,
        validate: {
            isIn: {
                args: [[ 'sakit','rujukan' ]],
                msg: 'Pilihan tidak valid',
            },
        },
    },
    versiSurat:{
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
    suratsakitId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    suratrujukanId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    invoiceNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    episodeId: {
        type: DataTypes.UUID,
        allowNull: false,
    }   
}, {
    timestamps: true,
    tableName: 'order_surat'
});


OrderSurat.belongsTo(SuratSakit, {
    foreignKey: 'suratsakitId',
    targetKey: 'uuid',
    as: 'suratsakit'
});

OrderSurat.belongsTo(SuratRujukan, {
    foreignKey: 'suratrujukanId',
    targetKey: 'uuid',
    as: 'suratrujukan'
});

OrderSurat.belongsTo(Episode, {
    foreignKey: 'episodeId',
    targetKey: 'uuid',
    as: 'episode'
});

module.exports = OrderSurat;