const {
    signupPasien,
    activatePasien,
    signinPasien,
} = require('../../../services/sequelize/pasien');
const { StatusCodes } = require('http-status-codes');

const signup = async (req, res, next) => {
    try {
        const result = await signupPasien(req);

        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const activeAccount = async (req, res, next) => {
    try {
        const result = await activatePasien(req);

        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const signin = async (req, res, next) => {
    try {
        const result = await signinPasien(req);

        res.status(StatusCodes.OK).json({
            data: { token: result },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    signup,
    activeAccount,
    signin
}