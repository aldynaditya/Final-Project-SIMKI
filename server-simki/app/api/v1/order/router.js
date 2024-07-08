const express = require("express");
const router = express.Router();
const {
    index
} = require("./controller");
const {
    authenticateUser,
    authorizeRoles
} = require('../../../middleware/auth');

router.get('/detail-information/:id',authenticateUser, authorizeRoles('superuser','farmasi','dokter'), index);

module.exports = router;