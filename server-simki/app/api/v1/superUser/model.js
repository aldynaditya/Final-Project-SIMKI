const { DataTypes } = require('sequelize');
const db = require('../../../db'); // Sesuaikan path ke instance Sequelize Anda

const SuperUser = db.define('super_user', {
    uuid:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    superuser: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
        },
    },
}, {
    timestamps: true,
    tableName: 'super_user'
});

module.exports = SuperUser;
