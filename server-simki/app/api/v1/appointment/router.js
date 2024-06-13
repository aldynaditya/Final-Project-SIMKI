const express = require("express");
const router = express.Router();
const {
    index,
    create,
    update
} = require("./controller");
const {
    authenticateUser,
    authorizeRoles
} = require('../../../middleware/auth');

router.get('/appointment',authenticateUser, authorizeRoles('superuser','resepsionis'), index);
router.post('/appointment',authenticateUser, authorizeRoles('superuser','resepsionis'), create);
router.patch('/appointment/:id',authenticateUser, authorizeRoles('superuser','resepsionis'), update);

module.exports = router;