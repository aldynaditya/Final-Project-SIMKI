const { StatusCodes } = require('http-status-codes');
const { 
    createOrderItem,
    getAllOrderItemById,
    deleteOrderItemById
} = require('../../../services/sequelize/orderProsedur');

const create = async (req, res, next) => {
    try {
        const result = await createOrderItem(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const find = async (req, res, next) => {
    try {
        const result = await getAllOrderItemById(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

const destroy = async (req, res, next) => {
    try {
        const result = await deleteOrderItemById(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    create,
    find,
    destroy
};
