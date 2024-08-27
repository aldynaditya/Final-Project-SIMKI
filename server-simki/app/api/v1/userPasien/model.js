const db = require('../../../db/index');
const User = require('../user/model');
const { DataTypes } = require('sequelize');

const UserPasien = db.define('userPasien', {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    status: {
        type: DataTypes.ENUM('aktif', 'tidak aktif'),
        defaultValue: 'tidak aktif',
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userPasienId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'uuid'
        }
    },
}, {
    tableName: 'userPasien'
});

UserPasien.hasOne(User, { foreignKey: 'userPasienId' });
User.belongsTo(UserPasien, { foreignKey: 'userPasienId' });

module.exports = UserPasien;

