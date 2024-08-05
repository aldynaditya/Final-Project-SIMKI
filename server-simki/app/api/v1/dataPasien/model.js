const db = require('../../../db/index'); // Sesuaikan path ke instance Sequelize Anda
const { DataTypes } = require('sequelize');
const Pasien = require('../pasien/model');

const DataPasien = db.define('dataPasien', {
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
            len: {
                args: [16, 16],
                msg: 'NIK terdiri dari 16 Karakter'
            }
        }
    },
    nama_lengkap: {
        type: DataTypes.STRING,
        allowNull: false,
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
    userId: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null
    },
},{
    timestamps: true,
    tableName: 'dataPasien'
});

Pasien.hasOne(DataPasien, { foreignKey: 'userId' });
DataPasien.belongsTo(Pasien, { foreignKey: 'userId' });

module.exports = DataPasien;