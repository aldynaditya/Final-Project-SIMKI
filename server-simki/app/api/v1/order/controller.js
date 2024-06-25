const { StatusCodes } = require('http-status-codes');
const { 
    createOrderObat
} = require('../../../services/sequelize/order');

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
            data: 'Obat berhasil terhapus',
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
    orderobat,
};
