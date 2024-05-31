const { Role, Permission } = require('../../api/v1/role/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllRole = async (req) => {
    const result = await Role.findAll(req.body);

    return result;
};

const getAllPermission = async (req) => {
    const result = await Permission.findAll(req.body);

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

const assignPermissiontoRole = async (req) => {
    const { roleName, permissionName } = req.body;
    // Cari obat berdasarkan nama dan organizer
    const role = await Role.findOne({ where: { name: roleName } });
    const permission = await Permission.findOne({ where: { name: permissionName } });
    // Jika obat sudah ada, tampilkan error bad request
    if (permission) throw new BadRequestError('Permission telah terdaftar');

    const result = await role.addPermission(permission);

    return result;
};

module.exports = { getAllRole, getAllPermission, createRole, assignPermissiontoRole };