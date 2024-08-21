const express = require("express");
const router = express.Router();
const {
    index,
    order,
    update
} = require("./controller");
const {
    authenticateUser,
    authorizeRoles
} = require('../../../middleware/auth');

router.get('/detail-information/:id',authenticateUser, authorizeRoles('superuser','farmasi','dokter','resepsionis'), index);
router.get('/order-obat',authenticateUser, authorizeRoles('superuser','farmasi','dokter'), order);
router.patch('/order-obat/:id',authenticateUser, authorizeRoles('superuser','farmasi'), update);

module.exports = router;