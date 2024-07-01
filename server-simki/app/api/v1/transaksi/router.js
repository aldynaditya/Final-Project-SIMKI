const express = require("express");
const router = express.Router();
const { 
    create, 
    index 
} = require("./controller");
const {
    authenticateUser,
    authorizeRoles
} = require('../../../middleware/auth');

router.get('/orders/:invoiceNumber',authenticateUser, authorizeRoles('superuser','kasir'), index);
router.post('/transaction/:invoiceNumber',authenticateUser, authorizeRoles('superuser','kasir'), create);

module.exports = router;