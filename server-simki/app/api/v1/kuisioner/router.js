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

router.get('/questions', index);
router.post('/questions', authenticateUser, authorizeRoles('dokter'), create);
router.get('/responses/:id', indexRes);

module.exports = router;
