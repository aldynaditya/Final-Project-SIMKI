const express = require("express");
const router = express.Router();
const {
    index,
    create,
    indexRes,
} = require("./controller");
const {
    authenticateUser,
    authorizeRoles,
} = require('../../../middleware/auth');

router.get('/questions', authenticateUser, authorizeRoles('dokter'), index);
router.post('/questions', authenticateUser, authorizeRoles('dokter'), create);
router.get('/responses/:id', authenticateUser, authorizeRoles('dokter'), indexRes);

module.exports = router;
