const express = require("express");
const router = express.Router();
const {
    index,
    find,
    create,
    search,
    update,
    destroy,
} = require("./controller");
const {
    authenticateUser,
    authorizeRoles
} = require('../../../middleware/auth');

router.get('/datapasien',authenticateUser, authorizeRoles('superuser', 'resepsionis', 'perawat'), index);
router.get('/datapasien/:id',authenticateUser, authorizeRoles('superuser', 'resepsionis', 'perawat'),find);
router.get('/search',authenticateUser, authorizeRoles('superuser', 'resepsionis', 'perawat'),search);
router.post('/datapasien',authenticateUser, authorizeRoles('superuser', 'resepsionis'), create);
router.patch('/datapasien/:id',authenticateUser, authorizeRoles('superuser', 'resepsionis', 'perawat'), update);
router.delete('/datapasien/:id',authenticateUser, authorizeRoles('superuser', 'resepsionis'), destroy);

module.exports = router;