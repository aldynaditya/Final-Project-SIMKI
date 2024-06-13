const db = require('../../../db/index'); // Sesuaikan path ke instance Sequelize Anda
const argon2 = require('argon2');
const { DataTypes } = require('sequelize');

const Pasien = db.define('pasien', {
    uuid:{
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
        type: DataTypes.ENUM('pasien'),
        defaultValue: 'pasien',
    },
    status: {
        type: DataTypes.ENUM('aktif', 'tidak aktif'),
        defaultValue: 'tidak aktif',
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    hooks: {
        beforeCreate: async (user) => {
            if (!user.role) {
                user.role = 'pasien';
            }
            user.password = await argon2.hash(user.password);
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                user.password = await argon2.hash(user.password);
            }
        },
    },
    tableName: 'pasien'
});

Pasien.prototype.comparePassword = async function (candidatePassword) {
    return await argon2.verify(this.password, candidatePassword);
};

module.exports = Pasien;

