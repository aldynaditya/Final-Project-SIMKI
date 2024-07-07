const app = require('../../../../app');
const {
    signupPasien,
    activatePasien,
    signinPasien,
    updateDataPasien,
    getDataPasien,
    createAppointment,
    getpasienAppointments,
    getAllVisitHistory,
    getDetailVisitHistory
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

const detail = async (req, res, next) => {
    try {
        const result = await getDataPasien(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

const history = async (req, res, next) => {
    try {
        const result = await getAllVisitHistory(req);

    res.status(StatusCodes.OK).json({
        data: result,
    })
    } catch (err) {
        next(err);
    }
}

const detailHistory = async (req, res, next) => {
    try {
        const result = await getDetailVisitHistory(req);

    res.status(StatusCodes.OK).json({
        data: result,
    })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    signup,
    activeAccount,
    signin,
    update,
    detail,
    makeAppointment,
    getmyAppointment,
    history,
    detailHistory
}