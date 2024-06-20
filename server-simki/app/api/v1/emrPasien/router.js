const express = require('express');
const router = express.Router();
const { 
    index, 
    vitalsign,
    episode,
    followupepisode,
    order
} = require('./controller');
const { 
    authenticateUser, 
    authorizeRoles 
} = require('../../../middleware/auth');

router.get('/emr', authenticateUser, authorizeRoles('dokter', 'perawat'), index);
router.post('/emr/:id/nurse', authenticateUser, authorizeRoles('perawat'), vitalsign);
router.post('/emr/:id/doctor/new', authenticateUser, authorizeRoles('dokter'), episode);
router.patch('/emr/:id/doctor/follow-up', authenticateUser, authorizeRoles('dokter'), followupepisode);
router.patch('/emr/:id/update-order', authenticateUser, authorizeRoles('dokter'), order);


module.exports = router;
