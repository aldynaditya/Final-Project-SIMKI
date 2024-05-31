const express = require("express");
const router = express.Router();

const { 
    create,
    index } = require('./controller');

router.get('/userklinik', index)
router.post('/userklinik', create);
// router.post('/assign-permission', assignPermission);

module.exports = router;