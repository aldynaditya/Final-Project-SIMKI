const { StatusCodes } = require('http-status-codes');
const { 
    getAllAppointment,
} = require('../../../services/sequelize/appointment');

const index = async (req, res, next) => {
    try {
        const result = await getAllAppointment(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    index,
};
