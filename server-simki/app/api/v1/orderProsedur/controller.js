const { StatusCodes } = require('http-status-codes');
const { 
    createOrderItem
} = require('../../../services/sequelize/order');

const orderitem = async (req, res, next) => {
    try {
        const result = await createOrderItem(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    orderitem
};
