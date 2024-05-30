const express = require('express');
const router = express.Router();
const { createUser, assignRole } = require('./controller');

router.post('/userklinik', createUser);
router.post('/assign-role', assignRole);

module.exports = router;
