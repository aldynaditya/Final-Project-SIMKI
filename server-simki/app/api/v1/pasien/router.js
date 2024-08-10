const express = require('express');
const router = express();
const {
    signup,
    resend,
    activeAccount,
    signin,
    makeAppointment,
    getmyAppointment,
    update,
    detail,
    history,
    detailHistory,
    forgotpassword,
    resetpassword,
    submit
} = require('./controller');

const {
    index,
} = require('../schedule/controller')

const {
    authenticatePasien,
} = require('../../../middleware/auth');

const checkEMRStatus = require('../../../middleware/checkEMRStatus');


router.post('/auth/signup', signup);
router.post('/resend-otp', resend);
router.post('/auth/signin', signin);
router.put('/active', activeAccount);
router.post('/forgot-password', forgotpassword);
router.post('/reset-password', resetpassword);
router.get('/schedule', index);
router.get('/pasien', authenticatePasien, detail);
router.patch('/pasien',authenticatePasien, update);
router.post('/appointment', authenticatePasien, makeAppointment);
router.get('/appointment', authenticatePasien, getmyAppointment);
router.get('/visit-history', authenticatePasien, history);
router.get('/visit-details/:id', authenticatePasien, detailHistory);
router.post('/responses/:id', authenticatePasien, checkEMRStatus, submit);


module.exports = router;