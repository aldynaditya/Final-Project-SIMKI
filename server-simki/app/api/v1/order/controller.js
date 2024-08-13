const { StatusCodes } = require('http-status-codes');
const { 
    getOrderDetailInformation,
    getALlOrderObatbyFarmasi,

} = require('../../../services/sequelize/order');

const index = async (req, res, next) => {
    try {
        const result = await getOrderDetailInformation(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

const order = async (req, res, next) => {
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
        const result = await updateOrderStatusbyFarmasi(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    index,
    order,
    update
}