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

router.get('/pasien', getPasien);
router.get('/pasien/:id', getPasienById);
router.post('/pasien', createPasien);
router.patch('/pasien/:id', updatePasien);
router.delete('/pasien/:id', deletePasien);

module.exports = router;