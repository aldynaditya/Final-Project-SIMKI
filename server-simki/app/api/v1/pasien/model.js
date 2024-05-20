const db = require('../../../db/index');
const { DataTypes } = require('sequelize');
const UserKlinik = require('../userKlinik/model');

const Pasien = db.define('pasien', {
    uuid:{
        type: DataTypes. STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    NIK:{
        type: DataTypes. INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            isInt: true,
            max: 16
        }
    },
    nama_pasien:{
        type: DataTypes. STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len : [3,100]
        }
    },
    tanggal_lahir:{
        type: DataTypes. DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    jenis_kelamin:{
        type: DataTypes.ENUM,
        values: ['Laki-Laki', 'Perempuan'],
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    gol_darah: {
        type: DataTypes.ENUM,
        values: ['O', 'A', 'B', 'AB'],
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    suku_bangsa: {
        type: DataTypes.ENUM,
        values: ['WNA', 'WNI'],
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    alamat:{
        type: DataTypes. STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len : [3,100]
        }
    },
    email:{
        type: DataTypes. STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password:{
        type: DataTypes. STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
}, {
    timestamps: true
});

UserKlinik.hasMany(Pasien);
Pasien.belongsTo(UserKlinik);

module.exports = Pasien;