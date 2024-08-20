const express = require("express");
const router = express.Router();
const {
    index,
    update,
} = require("./controller");
const {
    authenticateUser,
    authorizeRoles
} = require('../../../middleware/auth');


router.get('/suratsakit',authenticateUser, authorizeRoles('superuser','resepsionis','dokter'), index);
router.patch('/suratsakit/:id',authenticateUser, authorizeRoles('superuser','resepsionis','dokter'), update);

module.exports = router;