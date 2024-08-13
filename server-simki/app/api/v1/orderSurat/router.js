const express = require("express");
const router = express.Router();
const {
    ordersuratsakit,
    ordersuratrujukan,
    find,
    destroy
} = require("./controller");
const {
    authenticateUser,
    authorizeRoles
} = require('../../../middleware/auth');

router.get('/order-surat/:id',authenticateUser, authorizeRoles('superuser','resepsionis','dokter'), find);
router.post('/order-surat-sakit/:id',authenticateUser, authorizeRoles('superuser','farmasi','dokter'), ordersuratsakit);
router.post('/order-surat-rujukan/:id',authenticateUser, authorizeRoles('superuser','dokter'), ordersuratrujukan);
router.delete('/order-surat/:id',authenticateUser, authorizeRoles('superuser','dokter'), destroy);

module.exports = router;