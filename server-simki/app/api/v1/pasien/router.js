const express = require('express');
const router = express();
const {
    signup,
    activeAccount,
    signin,
    makeAppointment,
    getmyAppointment,
    update,
    detail
} = require('./controller');

const {
    authenticatePasien,
} = require('../../../middleware/auth');

router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
router.put('/active', activeAccount);
router.get('/pasien', authenticatePasien, detail);
router.patch('/pasien',authenticatePasien, update);
router.post('/appointment', authenticatePasien, makeAppointment);
router.get('/appointment', authenticatePasien, getmyAppointment);



module.exports = router;