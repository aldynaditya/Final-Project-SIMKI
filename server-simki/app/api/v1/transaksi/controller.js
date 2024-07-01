const { StatusCodes } = require('http-status-codes');
const { 
    createTransaction, 
    getOrdersByInvoice 
} = require('../../../services/sequelize/transaksi');

const index = async (req, res, next) => {
    try {
        const result = await getOrdersByInvoice(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const result = await createTransaction(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    index,
    create
};
