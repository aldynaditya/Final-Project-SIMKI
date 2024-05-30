const express = require("express");
const router = express.Router();

const { 
    index,
    create } = require('./controller');

router.get('/role', index);
router.post('/role', create);
// router.post('/assign-permission', assignPermission);

module.exports = router;

