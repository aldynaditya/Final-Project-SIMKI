const { StatusCodes } = require('http-status-codes');
const { 
    getAllAppointment,
    createAppointment,
    updateAppointment
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

const create = async (req, res, next) => {
    try {
        const result = await createAppointment(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const result = await updateAppointment(req);

        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    index,
    create,
    update
};
