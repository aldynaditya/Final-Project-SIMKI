const express = require("express");
const router = express.Router();
const {
    index,
    create,
    update,
    destroy
} = require("./controller");

const {
    authenticateUser,
    authorizeRoles
} = require('../../../middleware/auth');

router.get('/schedule',authenticateUser, index);
router.post('/schedule',authenticateUser, authorizeRoles('resepsionis'), create);
router.patch('/schedule/:id',authenticateUser, authorizeRoles('resepsionis'), update);
router.delete('/schedule/:id',authenticateUser, authorizeRoles('resepsionis'), destroy);

module.exports = router;