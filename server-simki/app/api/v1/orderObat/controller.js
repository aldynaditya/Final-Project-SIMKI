const { StatusCodes } = require('http-status-codes');
const { 
    createOrderObat,
    getALlOrderObatbyFarmasi
} = require('../../../services/sequelize/order');

const create = async (req, res, next) => {
    try {
        const result = await createOrderObat(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const index = async (req, res, next) => {
    try {
        const result = await getALlOrderObatbyFarmasi(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const result = await getALlOrderObat(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    create,
    index,
    update
};
