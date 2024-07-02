const db = require('../../../db/index');
const { DataTypes } = require('sequelize');
const Item = require('../item/model');
const Episode = require('../episode/model');

const OrderProsedur = db.define('order_prosedur', {
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
    itemId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    episodeId: {
        type: DataTypes.UUID,
        allowNull: false,
    }  
}, {
    timestamps: true,
    tableName: 'order_prosedur'
});


OrderProsedur.belongsTo(Item, {
    foreignKey: 'itemId',
    targetKey: 'uuid',
    as: 'dataitem'
});

OrderProsedur.belongsTo(Episode, {
    foreignKey: 'episodeId',
    targetKey: 'uuid',
    as: 'episode'
});

module.exports = OrderProsedur;