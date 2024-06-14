const app = require('../../../../app');
const {
    signupPasien,
    activatePasien,
    signinPasien,
    updateDataPasien,
    createAppointment,
    getpasienAppointments
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

const getmyAppointment = async (req, res, next) => {
    try {
        const result = await getpasienAppointments(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

const makeAppointment = async (req, res, next) => {
    try {
        const result = await createAppointment(req);

        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const result = await updateDataPasien(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    signup,
    activeAccount,
    signin,
    update,
    makeAppointment,
    getmyAppointment
}