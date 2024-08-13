const { StatusCodes } = require('http-status-codes');
const { 
    createOrderObat,
    getAllOrderObatById,
    deleteOrderObatById,
    updateAllOrderObatStatusById
} = require('../../../services/sequelize/orderObat');

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

const find = async (req, res, next) => {
    try {
        const result = await getAllOrderObatById(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const result = await updateAllOrderObatStatusById(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

const destroy = async (req, res, next) => {
    try {
        const result = await deleteOrderObatById(req);

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
    update,
    destroy
};
