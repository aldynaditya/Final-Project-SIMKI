const express = require("express");
const router = express();

router.get('/pasien', (req, res)=>{
    res.status(200).json({
        message: 'Halaman Pasien',
    });
});

module.exports = router;