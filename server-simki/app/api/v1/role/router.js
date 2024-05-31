const express = require("express");
const router = express.Router();

const { 
    indexr,
    indexp,
    create,
    assign } = require('./controller');

router.get('/role', indexr);
router.get('/permission', indexp);
router.post('/role', create);
router.post('/permission', assign);
// router.post('/assign-permission', assignPermission);

module.exports = router;

