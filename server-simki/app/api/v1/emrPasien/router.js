const express = require('express');
const router = express.Router();
const { 
    index, 
    indexformedicalrecord,
    vitalsign,
    episode,
    followupepisode,
    action,
    order,
    findformedicalrecord,
    findOneEMRforPatient,
    findOnevitalsign,
    indexListAllEMR
} = require('./controller');
const { 
    authenticateUser, 
    authorizeRoles 
} = require('../../../middleware/auth');

router.get('/emr', authenticateUser, authorizeRoles('dokter', 'perawat', 'resepsionis'), index);
router.get('/emr/:id', authenticateUser, authorizeRoles('dokter', 'perawat', 'resepsionis'), findOneEMRforPatient);
router.get('/vitalsign/:id', authenticateUser, authorizeRoles( 'dokter' ), findOnevitalsign);
router.post('/emr/:id/nurse', authenticateUser, authorizeRoles('perawat'), vitalsign);
router.post('/emr/:id/doctor/new', authenticateUser, authorizeRoles('dokter'), episode);
router.patch('/emr/:id/doctor/follow-up', authenticateUser, authorizeRoles('dokter'), followupepisode);
router.patch('/emr/:id/update-action', authenticateUser, authorizeRoles('dokter'), action);
router.post('/emr/:id/finish-order', authenticateUser, authorizeRoles('dokter'), order);
router.get('/medical-records/:id', authenticateUser, authorizeRoles('dokter'), indexformedicalrecord);
router.get('/medical-record/:id', authenticateUser, authorizeRoles('dokter'), findformedicalrecord);
router.get('/list-emr', authenticateUser, authorizeRoles('dokter', 'perawat', 'resepsionis'), indexListAllEMR);


module.exports = router;
