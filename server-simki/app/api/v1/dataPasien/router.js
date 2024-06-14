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

router.get('/datapasien',authenticateUser, authorizeRoles('superuser','resepsionis'), index);
router.get('/datapasien/:id',authenticateUser, authorizeRoles('superuser','resepsionis'),find);
router.post('/datapasien',authenticateUser, authorizeRoles('superuser','resepsionis'), create);
router.patch('/datapasien/:id',authenticateUser, authorizeRoles('superuser','resepsionis'), update);
router.delete('/datapasien/:id',authenticateUser, authorizeRoles('superuser','resepsionis'), destroy);

module.exports = router;