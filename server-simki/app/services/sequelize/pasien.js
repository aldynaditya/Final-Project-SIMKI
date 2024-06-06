const { Op } = require('sequelize');
const Pasien = require('../../api/v1/pasien/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const signupPasien = async (req) => {
    const { nik, nama_lengkap, tempat_lahir, tanggal_lahir, jenis_kelamin, gol_darah, suku_bangsa, alamat, email, password } = req.body
}