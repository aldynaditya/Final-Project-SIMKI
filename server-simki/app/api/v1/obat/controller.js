const { StatusCodes } = require('http-status-codes');
const { 
    getAllObat,
    createObat,
    getOneObat,
    updateObat,
    deleteObat } = require('../../../services/sequelize/obat'); // Assuming you have a Category model defined in 'models' directory

const index = async (req, res, next) => {
    try {
        const result = await getAllObat(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

const find = async (req, res, next) => {
    try {
        const result = await getOneObat(req);
        
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const result = await createObat(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const result = await updateObat(req);

        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const destroy = async (req, res, next) => {
    try {
        const result = await deleteObat(req);

        res.status(StatusCodes.OK).json({
            data: 'Medication deleted successfully',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    index,
    find,
    update,
    destroy,
    create,
};
