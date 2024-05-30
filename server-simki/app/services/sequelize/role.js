const { Role } = require('../../api/v1/role/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllRole = async (req) => {
    const result = await Role.findAll(req.body);

    return result;
};

const createRole = async (req) => {
    const { name } = req.body;
    // Cari obat berdasarkan nama dan organizer
    const check = await Role.findOne({ where: { name } });
    // Jika obat sudah ada, tampilkan error bad request
    if (check) throw new BadRequestError('Role telah terdaftar');

    const result = await Role.create({
        name
    });

    return result;
};

module.exports = { getAllRole, createRole };