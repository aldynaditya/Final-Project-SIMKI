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
    nik:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: 'NIK sudah terdaftar',
        },
        validate: {
            notEmpty: true,
        }
    },
    nama_lengkap: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: { msg: 'Nama harus diisi' },
        },
    },
    tempat_lahir: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Tempat Lahir harus diiisi' },
        },
    },
    tanggal_lahir: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: { msg: 'Tanggal Lahir harus diiisi' },
        },
    },
    jenis_kelamin: {
        type: DataTypes.ENUM( 'laki-laki', 'perempuan' ),
        allowNull: false,
        validate: {
            isIn: {
                args: [[ 'laki-laki', 'perempuan' ]],
                msg: 'Pilihan tidak valid',
            },
        },
    },
    gol_darah: {
        type: DataTypes.ENUM( 'O', 'A', 'B', 'AB' ),
        allowNull: false,
        validate: {
            isIn: {
                args: [[ 'O', 'A', 'B', 'AB' ]],
                msg: 'Pilihan tidak valid',
            },
        },
    },
    suku_bangsa: {
        type: DataTypes.ENUM( 'WNA', 'WNI' ),
        allowNull: false,
        validate: {
            isIn: {
                args: [[ 'WNA', 'WNI' ]],
                msg: 'Pilihan tidak valid',
            },
        },
    },
    alamat: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Alamat harus diiisi' },
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
        type: DataTypes.ENUM('pasien'),
        defaultValue: 'pasien',
        validate: {
            isIn: {
                args: [[ 'pasien' ]],
                msg: 'Role tidak valid',
            },
        },
    },
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
    tableName: 'pasien'
});

Pasien.prototype.comparePassword = async function (candidatePassword) {
    return await argon2.verify(this.password, candidatePassword);
};

module.exports = Pasien;

