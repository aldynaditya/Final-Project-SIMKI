const express = require('express');
const router = express.Router();
const { checkPermission } = require('./auth');

router.get('/some-protected-route', checkPermission('view_medical_records'), (req, res) => {
    res.json({ message: 'Anda memiliki izin untuk melihat catatan medis.' });
});

module.exports = router;
