const express = require("express");
const router = express.Router();
const {
    index,
    find,
    create,
    update,
    destroy,
} = require("./controller");
const {
    authenticateUser,
    authorizeRoles
} = require('../../../middleware/auth');

router.get('/obat',authenticateUser, authorizeRoles('superuser','farmasi','dokter'), index);
router.get('/obat/:id',authenticateUser, authorizeRoles('superuser','farmasi','dokter'),find);
router.post('/obat',authenticateUser, authorizeRoles('superuser','farmasi'), create);
router.patch('/obat/:id',authenticateUser, authorizeRoles('superuser','farmasi'), update);
router.delete('/obat/:id',authenticateUser, authorizeRoles('superuser','farmasi'), destroy);

module.exports = router;