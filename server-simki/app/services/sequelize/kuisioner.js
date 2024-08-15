const EMRPasien = require('../../api/v1/emrPasien/model');
const Question = require('../../api/v1/kuisioner/question/model');
const Response = require('../../api/v1/kuisioner/responses/model');
const { 
    NotFoundError, 
    BadRequestError
} = require('../../errors');

const getAllQuestions = async () => {
    const result = await Question.findAll();

    return result;
};

const createQuestion = async (req) => {
    const { text } = req.body;

    const result = await Question.create({ text });

    return result
};

const getResponsesByPatientId = async (req) => {
    const { id: uuid } = req.params;

    const emr = await EMRPasien.findOne({
        where: { uuid },
    });

    if (!emr) {
        throw new NotFoundError('respon tidak ditemukan');
    }

    const result = await Response.findAll({
        where: { emrpasienId: emr.uuid },
        include: [
            {
                model: Question,
                as: 'question',
            },
            {
                model: EMRPasien,
                as: 'emr',
            },
        ],
    });

    return result;
};

const getFeedbackbyId = async (req) => {
    const { id: uuid } = req.params;

    const emr = await EMRPasien.findOne({
        where: { uuid },
    });

    if (!emr) {
        throw new NotFoundError('respon tidak ditemukan');
    }

    return result;
};

const createFeedBack = async (req) => {
    const { id: uuid } = req.params;
    const { feed_back } = req.body;

    if (!feed_back) {
        throw new BadRequestError('isi feedback');
    }

    const emrPasien = await EMRPasien.findOne({ where: { uuid } });

    if (!emrPasien) {
        throw new NotFoundError('EMRPasien tidak ditemukan');
    }

    const responses = await Response.findAll({
        where: { emrpasienId: emrPasien.uuid },
    });

    if (responses.length === 0) {
        throw new BadRequestError('Feedback tidak bisa diakses karena respon tidak ditemukan');
    }

    emrPasien.feed_back = feed_back;
    const result = await emrPasien.save();

    return result;
};

module.exports = {
    getAllQuestions,
    createQuestion,
    getResponsesByPatientId,
    getFeedbackbyId,
    createFeedBack
};
