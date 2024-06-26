const express = require("express");
const router = express.Router();
const {
    ordersuratsakit,
    ordersuratrujukan
} = require("./controller");
const {
    authenticateUser,
    authorizeRoles
} = require('../../../middleware/auth');

router.post('/order-surat-sakit/:id',authenticateUser, authorizeRoles('superuser','farmasi','dokter'), ordersuratsakit);
router.post('/order-surat-rujukan/:id',authenticateUser, authorizeRoles('superuser','farmasi','dokter'), ordersuratrujukan);

module.exports = router;