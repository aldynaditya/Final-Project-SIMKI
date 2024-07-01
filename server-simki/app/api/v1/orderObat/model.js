const db = require('../../../db/index');
const { DataTypes } = require('sequelize');
const Obat = require('../obat/model');
const Episode = require('../episode/model');


const OrderObat = db.define('order_obat', {
    uuid:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    kuantitas:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    dosis:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    catatan:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    status: {
        type: DataTypes.ENUM('belum disetujui', 'diproses','sudah disetujui'),
        defaultValue: 'diproses',
    },
    obatId: {
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
    tableName: 'order_obat'
});


OrderObat.belongsTo(Obat, {
    foreignKey: 'obatId',
    targetKey: 'uuid',
    as: 'dataobat'
});

OrderObat.belongsTo(Episode, {
    foreignKey: 'episodeId',
    targetKey: 'uuid',
    as: 'episode'
});

module.exports = OrderObat;