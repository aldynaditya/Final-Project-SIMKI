const { StatusCodes } = require('http-status-codes');
const { 
    getAllSchedule,
    createSchedule,
    updateSchedule,
    deleteSchedule 
} = require('../../../services/sequelize/schedule');

const index = async (req, res, next) => {
    try {
        const result = await getAllSchedule(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const result = await createSchedule(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const result = await updateSchedule(req);

        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const destroy = async (req, res, next) => {
    try {
        const result = await deleteSchedule(req);

        res.status(StatusCodes.OK).json({
            data: 'Schedule berhasil terhapus',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    index,
    update,
    destroy,
    create,
};
