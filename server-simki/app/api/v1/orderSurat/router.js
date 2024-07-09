const express = require("express");
const router = express.Router();
const {
    ordersuratsakit,
    ordersuratrujukan,
    updatesuratsakit
} = require("./controller");
const {
    authenticateUser,
    authorizeRoles
} = require('../../../middleware/auth');

router.post('/order-surat-sakit/:id',authenticateUser, authorizeRoles('superuser','farmasi','dokter'), ordersuratsakit);
router.post('/order-surat-rujukan/:id',authenticateUser, authorizeRoles('superuser','dokter'), ordersuratrujukan);
router.patch('/update-surat-rujukan/:id',authenticateUser, authorizeRoles('superuser','resepsionis','dokter'), updatesuratsakit);

module.exports = router;