// const UserKlinik = require("./model");
// const argon2 = require("argon2");

// const getUserKlinik = async(req, res) =>{
//     try {
//         const response = await UserKlinik.findAll({
//             attributes: ['uuid','name','email','role']
//         });
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(500).json({msg: error.message});
//     }
// }

// const getUserKlinikById = async(req, res) =>{
//     try {
//         const response = await UserKlinik.findOne({
//             attributes: ['uuid','name','email','role'],
//             where: {
//                 uuid: req.params.id
//             }
//         });
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(500).json({msg: error.message});
//     }
// }

// const createUserKlinik = async(req, res) =>{
//     const {name, email, password, confPassword, role} = req.body;
//     if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password"});
//     const hashPassword = await argon2.hash(password);
//     try {
//         await UserKlinik.create({
//             name: name,
//             email: email,
//             password: hashPassword,
//             role: role
//         });
//         res.status(201).json({msg: "Register Berhasil"});
//     } catch (error) {
//         res.status(400).json({msg: error.message});
//     }
// }

// const updateUserKlinik = async(req, res) =>{
//     const user = await UserKlinik.findOne({
//         where: {
//             uuid: req.params.id
//         }
//     });
//     if(!user) return res.status(404).json({msg: "User Tidak ditemukan"});
//     const {name, email, password, confPassword, role} = req.body;
//     let hashPassword;
//     if(password === "" || password === null){
//         hashPassword = user.password
//     }else{
//         hashPassword = await argon2.hash(password);
//     }
//     if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password"});
//     try {
//         await UserKlinik.update({
//             name: name,
//             email: email,
//             password: hashPassword,
//             role: role
//         },{
//             where: {
//                 id: user.id
//             }
//         });
//         res.status(200).json({msg: "User Updated"});
//     } catch (error) {
//         res.status(400).json({msg: error.message});
//     }
// }

// const deleteUserKlinik = async(req, res) =>{
//     const user = await UserKlinik.findOne({
//         where: {
//             uuid: req.params.id
//         }
//     });
//     if(!user) return res.status(404).json({msg: "User Tidak ditemukan"});
//     try {
//         await UserKlinik.destroy({
//             where: {
//                 id: user.id
//             }
//         });
//         res.status(200).json({msg: "User Deleted"});
//     } catch (error) {
//         res.status(400).json({msg: error.message});
//     }
// }


// module.exports = {
//     getUserKlinik,
//     getUserKlinikById,
//     createUserKlinik,
//     updateUserKlinik,
//     deleteUserKlinik,
// };