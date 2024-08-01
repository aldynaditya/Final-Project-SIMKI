const  UserKlinik  = require('../../api/v1/userKlinik/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const createUsers = async (req) => {
    const { nama, password, role, email } = req.body;

    const result = await UserKlinik.create({
        nama,
        email,
        password,
        role,
    });
    
    return result;
};

const getAllUserKlinik = async (req) => {
    const userklinik = await UserKlinik.findAll(req.body);
    
    const result = userklinik.map(user => {

        return {
            id: user.uuid,
            nama: user.nama,
            email: user.email,
            password: user.password,
            role: user.role,
        }
    });
    
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