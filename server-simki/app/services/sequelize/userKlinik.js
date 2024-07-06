const  UserKlinik  = require('../../api/v1/userKlinik/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const createUsers = async (req) => {
    const { nama, password, role, confirmPassword, email } = req.body;

    if (password !== confirmPassword) {
        throw new BadRequestError('Password dan Konfirmasi password tidak cocok');
    }

    const result = await UserKlinik.create({
        nama,
        email,
        password,
        role,
    });
    
    return result;
};

const getAllUserKlinik = async (req) => {
    const result = await UserKlinik.findAll(req.body);

    return result;
};

const deleteUserKlinik = async (req) => {
    const { id } = req.params;

    const result = await UserKlinik.findOne({ where: {uuid: id} });

    if (!result) throw new NotFoundError(`Tidak ada User Klinik dengan id :  ${id}`);

    await result.destroy();

    return result;
};

module.exports = { 
    createUsers,
    getAllUserKlinik,
    deleteUserKlinik 
};