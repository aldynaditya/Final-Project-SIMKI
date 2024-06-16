const express = require('express');
const router = express.Router();
const { 
    index 
} = require('./controller');
const { 
    authenticateUser, 
    authorizeRoles 
} = require('../../../middleware/auth');

router.get('/emr', authenticateUser, authorizeRoles('dokter', 'perawat'), index);

module.exports = router;
