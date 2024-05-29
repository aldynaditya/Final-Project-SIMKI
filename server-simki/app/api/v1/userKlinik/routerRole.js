const express = require('express');
const router = express.Router();
const roleController = require('./controllerRole');

router.post('/create-role', roleController.createRole);
router.post('/assign-role', roleController.assignRoleToUser);

module.exports = router;
