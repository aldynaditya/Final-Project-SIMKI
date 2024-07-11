const express = require('express');
const router = express();
const {
    signup,
    activeAccount,
    signin,
    makeAppointment,
    getmyAppointment,
    update,
    detail,
    history,
    detailHistory,
    forgotpassword,
    resetpassword
} = require('./controller');

const {
    authenticatePasien,
} = require('../../../middleware/auth');


router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
router.put('/active', activeAccount);
router.post('/forgot-password', forgotpassword);
router.post('/reset-password', resetpassword);
router.get('/pasien', authenticatePasien, detail);
router.patch('/pasien',authenticatePasien, update);
router.post('/appointment', authenticatePasien, makeAppointment);
router.get('/appointment', authenticatePasien, getmyAppointment);
router.get('/visit-history', authenticatePasien, history);
router.get('/visit-details/:id', authenticatePasien, detailHistory);


module.exports = router;