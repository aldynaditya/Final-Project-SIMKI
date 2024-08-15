const express = require("express");
const router = express.Router();
const {
    index,
    create,
    indexRes,
    createFb,
    indexfb,
} = require("./controller");
const {
    authenticateUser,
    authorizeRoles,
} = require('../../../middleware/auth');

router.get('/questions', index);
router.post('/questions', authenticateUser, authorizeRoles('dokter'), create);
router.get('/responses/:id', indexRes);
router.get('/feedback/:id', indexfb);
router.post('/feedback/:id', authenticateUser, authorizeRoles('dokter'), createFb);

module.exports = router;
