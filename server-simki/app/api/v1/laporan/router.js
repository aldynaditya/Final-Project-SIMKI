const express = require("express");
const router = express.Router();
const {
    index,
    create,
    indexByPimpinan,
    acceptedByPimpinan
} = require("./controller");
const upload = require('../../../utils/multerConfig');
const {
    authenticateUser,
    authorizeRoles,
} = require('../../../middleware/auth');

router.get('/laporan', authenticateUser, authorizeRoles('spvkeuangan'), index);
router.post('/laporan', upload.single('file'), authenticateUser, authorizeRoles('spvkeuangan'), create);
router.get('/laporan/pimpinan', authenticateUser, authorizeRoles('pimpinan'), indexByPimpinan);
router.patch('/laporan/:id/status', authenticateUser, authorizeRoles('pimpinan'), acceptedByPimpinan);

module.exports = router;
