const { StatusCodes } = require('http-status-codes');
const { 
    createOrderSuratRujukan,
    createOrderSuratSakit,
    updateSuratSakit
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

const updatesuratsakit = async (req, res, next) => {
    try {
        const result = await updateSuratSakit(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    ordersuratrujukan,
    ordersuratsakit,
    updatesuratsakit
};
