const express = require('express');
const router = express();
const {
    signup,
    activeAccount,
    signin,
    makeAppointment,
    getmyAppointment,
    update
} = require('./controller');

const {
    authenticatePasien,
    authorizeRoles
} = require('../../../middleware/auth');

router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
router.put('/active', activeAccount);
router.patch('/pasien',authenticatePasien, update);
router.post('/appointment', authenticatePasien, makeAppointment);
router.get('/appointment', authenticatePasien, getmyAppointment);


module.exports = router;