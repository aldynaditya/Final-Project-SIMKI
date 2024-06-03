const express = require("express");
const router = express.Router();

const { 
    createCMSsuperuser,
    createCMSusers,
    getCMSusers
} = require('./controller');
const {
    authenticateUser,
    authorizeRoles
} = require('../../../middleware/auth');

router.post('/superuser', createCMSsuperuser);
router.post('/userklinik', authenticateUser, createCMSusers);
router.get('/userklinik', authenticateUser, getCMSusers)

module.exports = router;