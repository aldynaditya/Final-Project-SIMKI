const { StatusCodes } = require('http-status-codes');
const { 
    getAllEMRPasien,
    createVitalSignbyPerawat,
    updateEpisode,
    createEpisode,
    updateAction,
    finishOrder
} = require('../../../services/sequelize/emrPasien');

const index = async (req, res, next) => {
    try {
        const result = await getAllEMRPasien(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

const vitalsign = async (req, res, next) => {
    try {
        const result = await createVitalSignbyPerawat(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

const followupepisode = async (req, res, next) => {
    try {
        const result = await updateEpisode(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

const episode = async (req, res, next) => {
    try {
        const result = await createEpisode(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

const action = async (req, res, next) => {
    try {
        const result = await updateAction(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

const order = async (req, res, next) => {
    try {
        const result = await finishOrder(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};


module.exports = {
    index,
    vitalsign,
    followupepisode,
    episode,
    action,
    order
}