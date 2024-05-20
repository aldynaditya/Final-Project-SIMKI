const express = require("express");
const router = express.Router();

const {
    getUserKlinik,
    getUserKlinikById,
    createUserKlinik,
    updateUserKlinik,
    deleteUserKlinik,
} = require("./controller");

router.get('/UserKlinik', getUserKlinik);
router.get('/UserKlinik/:id', getUserKlinikById);
router.post('/UserKlinik', createUserKlinik);
router.patch('/UserKlinik/:id', updateUserKlinik);
router.delete('/UserKlinik/:id', deleteUserKlinik);

module.exports = router;