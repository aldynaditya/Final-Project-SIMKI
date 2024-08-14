const { StatusCodes } = require('http-status-codes');
const { 
    createOrderSuratRujukan,
    createOrderSuratSakit,
    getAllOrderSuratById,
    deleteOrderSuratById
} = require('../../../services/sequelize/orderSurat');

const ordersuratsakit = async (req, res, next) => {
    try {
        const result = await createOrderSuratSakit(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const ordersuratrujukan = async (req, res, next) => {
    try {
        const result = await createOrderSuratRujukan(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const find = async (req, res, next) => {
    try {
        const result = await getAllOrderSuratById(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

const destroy = async (req, res, next) => {
    try {
        const result = await deleteOrderSuratById(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    ordersuratrujukan,
    ordersuratsakit,
    find,
    destroy
};
