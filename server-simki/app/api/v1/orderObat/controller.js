const { StatusCodes } = require('http-status-codes');
const { 
    createOrderObat,
} = require('../../../services/sequelize/order');

const orderobat = async (req, res, next) => {
    try {
        const result = await createOrderObat(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    orderobat,
};
