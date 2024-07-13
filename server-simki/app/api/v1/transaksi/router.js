const express = require("express");
const router = express.Router();
const {  
    index, 
    find,
    update,
    indexByPeriod
} = require("./controller");
const {
    authenticateUser,
    authorizeRoles
} = require('../../../middleware/auth');

router.get('/orders',authenticateUser, authorizeRoles('superuser','kasir'), index);
router.get('/orders/:id',authenticateUser, authorizeRoles('superuser','kasir'), find);
router.patch('/transaction/:id',authenticateUser, authorizeRoles('superuser','kasir'), update);
router.get('/transaction',authenticateUser, authorizeRoles('superuser','spvkeuangan'), indexByPeriod);

module.exports = router;