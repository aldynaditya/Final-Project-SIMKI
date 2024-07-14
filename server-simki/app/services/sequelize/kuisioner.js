const EMRPasien = require('../../api/v1/emrPasien/model');
const Episode = require('../../api/v1/episode/model');
const Question = require('../../api/v1/kuisioner/question/model');
const Response = require('../../api/v1/kuisioner/responses/model');
const { BadRequestError, NotFoundError } = require('../../errors');

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
        include: [{
            model: Question,
            as: 'question'
        }],
    });

    return result;
};

module.exports = {
    getAllQuestions,
    createQuestion,
    getResponsesByPatientId
};
