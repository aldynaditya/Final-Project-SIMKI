const db = require('../../../db/index');
const { DataTypes } = require('sequelize');
const Obat = require('../obat/model');
const Episode = require('../episode/model');


const OrderObat = db.define('orderObat', {
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
    total:{
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    status: {
        type: DataTypes.ENUM( 'unprocessed','paid', 'in process','accepted' ),
        defaultValue: 'unprocessed',
    },
    obatId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    episodeId: {
        type: DataTypes.UUID,
        allowNull: false,
    }
}, {
    timestamps: true,
    tableName: 'orderObat'
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