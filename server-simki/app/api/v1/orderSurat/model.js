const db = require('../../../db/index');
const { DataTypes } = require('sequelize');
const SuratSakit = require('../suratSakit/model');
const SuratRujukan = require('../suratRujukan/model');
const Episode = require('../episode/model');

const OrderSurat = db.define('orderSurat', {
    uuid:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    jenis_surat:{
        type: DataTypes.ENUM( 'sakit','rujukan' ),
        allownull: false,
        validate: {
            isIn: {
                args: [[ 'sakit','rujukan' ]],
                msg: 'Pilihan tidak valid',
            },
        },
    },
    versi_surat:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'v1.0'
    },
    status: {
        type: DataTypes.ENUM('updated','not confirm', 'in process','confirm'),
        defaultValue: 'in process',
    },
    suratSakitId: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    suratRujukanId: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    episodeId: {
        type: DataTypes.UUID,
        allowNull: false,
    }   
}, {
    timestamps: true,
    tableName: 'orderSurat'
});


OrderSurat.belongsTo(SuratSakit, {
    foreignKey: 'suratSakitId',
    targetKey: 'uuid',
    as: 'suratsakit'
});

OrderSurat.belongsTo(SuratRujukan, {
    foreignKey: 'suratRujukanId',
    targetKey: 'uuid',
    as: 'suratrujukan'
});

OrderSurat.belongsTo(Episode, {
    foreignKey: 'episodeId',
    targetKey: 'uuid',
    as: 'episode'
});

module.exports = OrderSurat;