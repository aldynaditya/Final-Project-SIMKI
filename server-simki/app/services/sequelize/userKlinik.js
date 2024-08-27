const UserKlinik = require('../../api/v1/userKlinik/model');
const User = require('../../api/v1/user/model');
const db = require('../../db');
const { NotFoundError } = require('../../errors');

const createUsers = async (req) => {
    const { nama, password, role, email } = req.body;

    const transaction = await db.transaction();

    try {
        const user = await User.create({
            email,
            password,
            role,
            userKlinikId: user.uuid
        }, { transaction });
        
        const userKlinik = await UserKlinik.create({ nama, userKlinikId: user.uuid, }, { transaction });

        await transaction.commit();

        return { userKlinik, user };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

const getAllUserKlinik = async () => {
    const userKliniks = await UserKlinik.findAll({
        include: {
            model: User
        }
    });

    // const result = userKliniks.map(userk => ({
    //     id: userk.uuid,
    //     nama: userk.nama,
    //     userKlinikId: userk.user,
    //     email: userk.user.email,
    //     role: userk.user.role,
    // }));

    return userKliniks;
};

const deleteUserKlinik = async (req) => {
    const { id } = req.params;

    const userKlinik = await UserKlinik.findOne({
        where: { uuid: id },
        include: { model: User }
    });

    if (!userKlinik) throw new NotFoundError(`Tidak ada User Klinik dengan id: ${id}`);

    const user = userKlinik.user;
    if (user) {
        await user.destroy();
    }

    await userKlinik.destroy();

    return userKlinik;
};

module.exports = { 
    createUsers,
    getAllUserKlinik,
    deleteUserKlinik 
};
