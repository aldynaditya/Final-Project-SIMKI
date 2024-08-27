const db = require('../../../db/index');
const argon2 = require('argon2');
const { DataTypes } = require('sequelize');

const User = db.define('user', {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notNull: { msg: 'Email harus diisi' },
            isEmail: { msg: 'Email tidak valid' },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Password harus diisi' },
            len: { args: [6], msg: 'Password minimal 6 karakter' },
        },
    },
    role: {
        type: DataTypes.ENUM('superuser', 'dokter', 'perawat', 'farmasi', 'kasir', 'pimpinan', 'spvkeuangan', 'resepsionis', 'pasien'),
        allowNull: false,
        validate: {
            isIn: {
                args: [['superuser', 'dokter', 'perawat', 'farmasi', 'kasir', 'pimpinan', 'spvkeuangan', 'resepsionis', 'pasien']],
                msg: 'Role tidak valid',
            },
        },
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            user.password = await argon2.hash(user.password);
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                user.password = await argon2.hash(user.password);
            }
        },
    },
    tableName: 'user'
});

User.prototype.comparePassword = async function (candidatePassword) {
    return await argon2.verify(this.password, candidatePassword);
};

module.exports = User;

