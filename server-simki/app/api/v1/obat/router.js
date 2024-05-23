const express = require("express");
const router = express.Router();

const {
    index,
    find,
    create,
    update,
    destroy,
} = require("./controller");

router.get('/obat', index);
router.get('/obat/:id', find);
router.post('/obat', create);
router.patch('/obat/:id', update);
router.delete('/obat/:id', destroy);

module.exports = router;