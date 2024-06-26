const { StatusCodes } = require('http-status-codes');
const { 
    createOrderSuratRujukan,
    createOrderSuratSakit
} = require('../../../services/sequelize/order');

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

module.exports = {
    ordersuratrujukan,
    ordersuratsakit
};
