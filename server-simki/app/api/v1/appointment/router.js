const express = require("express");
const router = express.Router();
const {
    index,
} = require("./controller");
const {
    authenticateUser,
    authorizeRoles
} = require('../../../middleware/auth');

router.get('/appointment',authenticateUser, authorizeRoles('superuser','resepsionis'), index);

module.exports = router;