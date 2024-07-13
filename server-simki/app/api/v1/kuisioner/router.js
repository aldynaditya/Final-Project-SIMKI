const express = require("express");
const router = express.Router();
const {
    index,
    create,
    indexRes,
    submit
} = require("./controller");
const {
    authenticateUser,
    authorizeRoles,
} = require('../../../middleware/auth');
const checkEMRStatus = require('../../../middleware/checkEMRStatus');

router.get('/questions', authenticateUser, authorizeRoles('dokter'), index);
router.post('/questions', authenticateUser, authorizeRoles('dokter'), create);
router.get('/responses/:id', authenticateUser, authorizeRoles('dokter'), indexRes);
router.post('/responses/:id', authenticateUser, authorizeRoles('pasien','dokter'), checkEMRStatus, submit);

module.exports = router;
