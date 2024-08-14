const express = require("express");
const router = express.Router();
const {
    create,
    find,
    destroy,
    update
} = require("./controller");
const {
    authenticateUser,
    authorizeRoles
} = require('../../../middleware/auth');

router.get('/order-obat/:id',authenticateUser, authorizeRoles('superuser','farmasi','dokter'), find);
router.post('/order-obat/:id',authenticateUser, authorizeRoles('superuser','dokter'), create);
router.patch('/order-obat/status/:id',authenticateUser, authorizeRoles('superuser','dokter'), update);
router.delete('/order-obat/:id',authenticateUser, authorizeRoles('superuser','dokter'), destroy);

module.exports = router;