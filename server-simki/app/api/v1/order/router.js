const express = require("express");
const router = express.Router();
const {
    orderobat
} = require("./controller");
const {
    authenticateUser,
    authorizeRoles
} = require('../../../middleware/auth');

router.post('/order-obat/:id',authenticateUser, authorizeRoles('superuser','farmasi','dokter'), orderobat);

module.exports = router;