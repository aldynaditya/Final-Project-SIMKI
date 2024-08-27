const UserKlinik = require('../../api/v1/userKlinik/model');
const User = require('../../api/v1/user/model');
const { 
    BadRequestError, 
    UnauthorizedError 
} = require('../../errors');
const { 
    createTokenUser, 
    createJWT 
} = require('../../utils');

const signin = async (req) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }

    const result = await User.findOne({
        where: { email: email },
        include: {
            model: UserKlinik
        } 
    });

    if (!result) {
        throw new UnauthorizedError('Invalid Credentials');
    }

    const isPasswordCorrect = await result.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new UnauthorizedError('Invalid Credentials');
    }

    const token = createJWT({ payload: createTokenUser(result) });

    return { 
        token: token,
        role: result.role,
        nama: result.userKlinik.nama
    };
};

module.exports = { signin };