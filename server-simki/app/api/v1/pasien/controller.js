// const Pasien = require("./model");
// const UserKlinik = require("./model");
// const argon2 = require("argon2");

// const getPasien = async(req, res) =>{
//     try {
//         const response = await Pasien.findAll({
//             attributes: ['uuid','name','email','role']
//         });
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(500).json({msg: error.message});
//     }
// }

// const getPasienById = async(req, res) =>{
//     try {
//         const response = await Pasien.findOne({
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

// const createPasien = async (req, res) => {
//     const {NIK,nama_pasien,tanggal_lahir,jenis_kelamin,gol_darah,suku_bangsa,alamat,email,password} = req.body;
//     const hashPassword = await argon2.hash(password);
//     try {
//         const newPasien = await Pasien.create({
//             NIK,
//             nama_pasien,
//             tanggal_lahir,
//             jenis_kelamin,
//             gol_darah,
//             suku_bangsa,
//             alamat,
//             email,
//             password: hashPassword,
//         });

//         res.status(201).json({ msg: "Pasien berhasil didaftarkan", data: newPasien });
//     } catch (error) {
//         res.status(400).json({ msg: error.message });
//     }
// };



// const updatePasien = (req, res) =>{
    
// }

// const deletePasien = (req, res) =>{
    
// }

// module.exports = {
//     getPasien,
//     getPasienById,
//     createPasien,
//     updatePasien,
//     deletePasien,
// };