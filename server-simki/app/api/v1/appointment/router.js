const express = require("express");
const router = express.Router();
const {
    index,
    create,
    update,
    find
} = require("./controller");
const {
    authenticateUser,
    authorizeRoles
} = require('../../../middleware/auth');

router.get('/appointment',authenticateUser, authorizeRoles('superuser','resepsionis'), index);
router.get('/appointment/:id',authenticateUser, authorizeRoles('superuser','resepsionis'), find);
router.post('/appointment/:id',authenticateUser, authorizeRoles('superuser','resepsionis'), create);
router.patch('/appointment/:id',authenticateUser, authorizeRoles('superuser','resepsionis'), update);

module.exports = router;