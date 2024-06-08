const express = require('express');
const router = express();
const {
    signup,
    activeAccount,
    signin,
} = require('./controller');

router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
router.put('/active', activeAccount);


module.exports = router;