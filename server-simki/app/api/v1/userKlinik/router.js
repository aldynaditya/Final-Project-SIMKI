const express = require("express");
const router = express.Router();

const { 
    createCMSusers,
    getCMSusers,
    deleteCMSusers
} = require('./controller');
const {
    authenticateUser,
    authorizeRoles
} = require('../../../middleware/auth');

router.post('/userklinik', authenticateUser, authorizeRoles('superuser'), createCMSusers);
router.get('/userklinik', authenticateUser, authorizeRoles('superuser'), getCMSusers)
router.delete('/userklinik/:id', authenticateUser, authorizeRoles('superuser'), deleteCMSusers);

module.exports = router;