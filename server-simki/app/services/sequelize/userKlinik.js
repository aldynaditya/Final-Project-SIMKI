const  UserKlinik  = require('../../api/v1/userKlinik/model');
const SuperUser = require('../../api/v1/superUser/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const createSuperUser = async (req) => {
    const { superuser, name, email, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) {
        throw new BadRequestError('Password dan Konfirmasi password tidak cocok');
        }
    
    const superUser = await SuperUser.create({ superuser });
    const superuserId = superUser.uuid;
    
    const users = await UserKlinik.create({
        email,
        name,
        password,
        superuser: superuserId,
        role,
    });

    return users;
};

const createUsers = async (req, res) => {
    const { name, password, role, confirmPassword, email } = req.body;

    if (password !== confirmPassword) {
        throw new BadRequestError('Password dan Konfirmasi password tidak cocok');
    }

    const result = await UserKlinik.create({
        name,
        email,
        superuser: req.user.superuser,
        password,
        role,
    });

    return result;
};

const getAllUserKlinik = async (req) => {
    const result = await UserKlinik.findAll(req.body);

    return result;
};

module.exports = { 
    createSuperUser,
    createUsers,
    getAllUserKlinik 
};