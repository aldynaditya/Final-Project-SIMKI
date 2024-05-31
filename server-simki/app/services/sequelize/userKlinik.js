const { UserKlinik  } = require('../../api/v1/userKlinik/model');
const { Role } = require('../../api/v1/role/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllUserKlinik = async (req) => {
    const result = await UserKlinik.findAll(req.body);

    return result;
};

const createUserKlinik = async (req) => {
    const { name, password, role } = req.body;
    // Cari obat berdasarkan nama dan organizer
    const check = await UserKlinik.findOne({ where: { name } });
    if (check) throw new BadRequestError('Nama telah terdaftar');
    const userRole = await Role.findOne({ where: { name : role } });
    if (!userRole) throw new BadRequestError('Role tidak valid');

    const result = await UserKlinik.create({
        name,
        password,
        role
    });

    await result.addRole(userRole);

    return result;
};

module.exports = { getAllUserKlinik, createUserKlinik };