const { StatusCodes } = require('http-status-codes');
const { 
    getAllQuestions,
    createQuestion,
    getResponsesByPatientId,
    getFeedbackbyId,
    createFeedBack
} = require('../../../services/sequelize/kuisioner');

const index = async (req, res, next) => {
    try {
        const result = await getAllQuestions(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const result = await createQuestion(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const indexRes = async (req, res, next) => {
    try {
        const result = await getResponsesByPatientId(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

const indexfb = async (req, res, next) => {
    try {
        const result = await getFeedbackbyId(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

const createFb = async (req, res, next) => {
    try {
        const result = await createFeedBack(req);

    res.status(StatusCodes.OK).json({
        data: result,
    })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    index,
    create,
    indexRes,
    indexfb,
    createFb,
};
