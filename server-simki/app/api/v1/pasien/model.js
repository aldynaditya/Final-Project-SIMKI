// const db = require('../../../db/index');
// const { DataTypes } = require('sequelize');
// const UserKlinik = require('../userKlinik/model');

// const Pasien = db.define('pasien', {
//     uuid:{
//         type: DataTypes. STRING,
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false,
//         validate: {
//             notEmpty: true
//         }
//     },
//     NIK:{
//         type: DataTypes. INTEGER,
//         allowNull: false,
//         validate: {
//             notEmpty: {
//                 msg: 'Harus diisi',
//             },
//             isInt: {
//                 msg: 'Hanya gunakan Angka',
//             },
//             len : {
//                 args: [16],
//                 msg: 'Terdapat 16 angka didalam NIK',
//             },
//         },
//     },
//     nama_pasien:{
//         type: DataTypes. STRING,
//         allowNull: false,
//         validate: {
//             notEmpty: {
//                 msg: 'Harus diisi',
//             },
//             len : {
//                 args: [100],
//             },
//         }
//     },
//     tanggal_lahir:{
//         type: DataTypes. DATE,
//         allowNull: false,
//         validate: {
//             notEmpty: true,
//             isDate: {
//                 msg: 'Tanggal lahir harus berupa tanggal yang valid',
//             },
//         }
//     },
//     jenis_kelamin:{
//         type: DataTypes.ENUM('Laki-Laki', 'Perempuan'),
//         allowNull: false,
//     },
//     gol_darah: {
//         type: DataTypes.ENUM('O', 'A', 'B', 'AB'),
//         allowNull: false,
//     },
//     suku_bangsa: {
//         type: DataTypes.ENUM('WNA', 'WNI'),
//         allowNull: false,
//     },
//     alamat:{
//         type: DataTypes. STRING,
//         allowNull: false,
//         validate: {
//             notEmpty: true,
//             len : [200]
//         }
//     },
//     email:{
//         type: DataTypes. STRING,
//         allowNull: false,
//         unique: {
//             msg: 'Email sudah digunakan',
//         },
//         validate: {
//             notEmpty: true,
//             isEmail: {
//                 msg: 'Email harus valid',
//             },
//         }
//     },
//     password:{
//         type: DataTypes. STRING,
//         allowNull: false,
//         validate: {
//             notEmpty: {
//                 msg: 'Password harus diisi',
//             },
//             len: {
//                 args: [6],
//                 msg: 'Password harus terdiri dari minimal 6 karakter',
//             },
//         }
//     }
// }, {
//     timestamps: true
// });

// UserKlinik.hasMany(Pasien);
// Pasien.belongsTo(UserKlinik);

// module.exports = Pasien;