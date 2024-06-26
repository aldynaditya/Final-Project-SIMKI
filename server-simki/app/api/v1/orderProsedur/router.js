const express = require("express");
const router = express.Router();
const {
    orderitem
} = require("./controller");
const {
    authenticateUser,
    authorizeRoles
} = require('../../../middleware/auth');

router.post('/order-item/:id',authenticateUser, authorizeRoles('superuser','farmasi','dokter'), orderitem);

module.exports = router;