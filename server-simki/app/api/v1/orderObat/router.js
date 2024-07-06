const express = require("express");
const router = express.Router();
const {
    create,
    index,
    update,
} = require("./controller");
const {
    authenticateUser,
    authorizeRoles
} = require('../../../middleware/auth');

router.get('/order-obat',authenticateUser, authorizeRoles('superuser','farmasi','dokter'), index);
router.post('/order-obat/:id',authenticateUser, authorizeRoles('superuser','farmasi','dokter'), create);
router.patch('/order-obat/:id',authenticateUser, authorizeRoles('superuser','farmasi','dokter'), update);

module.exports = router;