const express = require('express');
const router = express();
const {
    signup,
    activeAccount,
    signin,
    appointment
} = require('./controller');

const {
    authenticatePasien,
    authorizeRoles
} = require('../../../middleware/auth');

router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
router.put('/active', activeAccount);
router.post('/appointment',authenticatePasien, appointment)


module.exports = router;