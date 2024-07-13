const { StatusCodes } = require('http-status-codes');
const { 
    getAllOrders,
    getOrderDetails, 
    updateTransaction,
    filterAllTransactionByPeriod
} = require('../../../services/sequelize/transaksi');

const index = async (req, res, next) => {
    try {
        const result = await getAllOrders(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const find = async (req, res, next) => {
    try {
        const result = await getOrderDetails(req);
        
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const result = await updateTransaction(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const indexByPeriod = async (req, res, next) => {
    try {
        const result = await filterAllTransactionByPeriod(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    index,
    find,
    update,
    indexByPeriod
};
