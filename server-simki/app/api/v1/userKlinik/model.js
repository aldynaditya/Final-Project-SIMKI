const db = require('../../../db/index');
const argon2 = require('argon2');
const { DataTypes } = require('sequelize');

const UserKlinik = db.define('userKlinik', {
    uuid:{
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
        unique: true,
        validate: {
            notNull: { msg: 'Nama harus diisi' },
        len: { 
            args: [3, 50], 
            msg: 'Nama harus antara 3 dan 50 karakter' },
        },
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
        type: DataTypes.ENUM( 'superuser', 'dokter', 'perawat', 'farmasi', 'kasir', 'pimpinan', 'spvkeuangan', 'resepsionis' ),
        defaultValue: 'superuser',
        validate: {
            isIn: {
                args: [[ 'superuser', 'dokter', 'perawat', 'farmasi', 'kasir', 'pimpinan', 'spvkeuangan', 'resepsionis' ]],
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
    tableName: 'userKlinik'
});

UserKlinik.prototype.comparePassword = async function (candidatePassword) {
    return await argon2.verify(this.password, candidatePassword);
};

module.exports = UserKlinik;

