// const express = require("express");
// const router = express();

// router.get('/pasien', (req, res)=>{
//     res.status(200).json({
//         message: 'Halaman Pasien',
//     });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();

const {
    getPasien,
    getPasienById,
    createPasien,
    updatePasien,
    deletePasien,
} = require("./controller");

router.get('/Pasien', getPasien);
router.get('/Pasien/:id', getPasienById);
router.post('/Pasien', createPasien);
router.patch('/Pasien/:id', updatePasien);
router.delete('/Pasien/:id', deletePasien);

module.exports = router;