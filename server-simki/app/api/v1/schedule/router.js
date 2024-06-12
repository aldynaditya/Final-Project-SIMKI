const express = require("express");
const router = express.Router();
const {
    index,
    create,
    update,
    destroy
} = require("./controller");

router.get('/schedule', index);
router.post('/schedule', create);
router.patch('/schedule/:id', update);
router.delete('/schedule/:id', destroy);

module.exports = router;