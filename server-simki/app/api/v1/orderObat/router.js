const express = require("express");
const router = express.Router();
const {
    create,
    find,
    destroy
} = require("./controller");
const {
    authenticateUser,
    authorizeRoles
} = require('../../../middleware/auth');

router.get('/order-obat/:id',authenticateUser, authorizeRoles('superuser','farmasi','dokter'), find);
router.post('/order-obat/:id',authenticateUser, authorizeRoles('superuser','dokter'), create);
router.delete('/order-obat/:id',authenticateUser, authorizeRoles('superuser','dokter'), destroy);

module.exports = router;