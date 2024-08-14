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

router.get('/order-item/:id',authenticateUser, authorizeRoles('superuser','perawat','dokter'), find);
router.post('/order-item/:id',authenticateUser, authorizeRoles('superuser','dokter'), create);
router.delete('/order-item/:id',authenticateUser, authorizeRoles('superuser','dokter'), destroy);

module.exports = router;