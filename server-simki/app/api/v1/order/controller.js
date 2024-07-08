const { StatusCodes } = require('http-status-codes');
const { 
    getOrderDetailInformation
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

module.exports = {
    index
}