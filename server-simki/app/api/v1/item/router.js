const express = require("express");
const router = express.Router();
const {
    index,
    find,
    create,
    update,
    destroy,
    one,
} = require("./controller");
const {
    authenticateUser,
    authorizeRoles
} = require('../../../middleware/auth');

router.get('/item',authenticateUser, authorizeRoles('superuser','perawat','dokter'), index);
router.get('/item/:id',authenticateUser, authorizeRoles('superuser','perawat','dokter'), one);
router.get('/item/:query',authenticateUser, authorizeRoles('superuser','perawat','dokter'),find);
router.post('/item',authenticateUser, authorizeRoles('superuser','perawat'), create);
router.patch('/item/:id',authenticateUser, authorizeRoles('superuser','perawat'), update);
router.delete('/item/:id',authenticateUser, authorizeRoles('superuser','perawat'), destroy);

module.exports = router;