const db = require('../../../db/index');
const User = require('../user/model');
const { DataTypes } = require('sequelize');

const UserKlinik = db.define('userKlinik', {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: { 
                args: [3, 50], 
                msg: 'Nama harus antara 3 dan 50 karakter' 
            },
        },
    },
    userKlinikId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'uuid'
        }
    },
}, {
    tableName: 'userKlinik'
});

UserKlinik.hasOne(User, { foreignKey: 'userKlinikId' });
User.belongsTo(UserKlinik, { foreignKey: 'userKlinikId' });

module.exports = UserKlinik;

