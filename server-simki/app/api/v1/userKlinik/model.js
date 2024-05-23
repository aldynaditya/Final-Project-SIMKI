// const db = require('../../../db/index');
// const { DataTypes } = require('sequelize');

// const UserKlinik = db.define('user_klinik', {
//     uuid:{
//         type: DataTypes. STRING,
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false,
//         validate: {
//             notEmpty: true
//         }
//     },
//     name:{
//         type: DataTypes. STRING,
//         allowNull: false,
//         validate: {
//             notEmpty: true,
//             len : [3,100]
//         }
//     },
//     email:{
//         type: DataTypes. STRING,
//         allowNull: false,
//         validate: {
//             notEmpty: true,
//             isEmail: true
//         }
//     },
//     password:{
//         type: DataTypes. STRING,
//         allowNull: false,
//         validate: {
//             notEmpty: true,
//         }
//     },
//     role:{
//         type: DataTypes. STRING,
//         allowNull: false,
//         validate: {
//             notEmpty: true,
//         }
//     }  
// }, {
//     timestamps: true
// });

// module.exports = UserKlinik;