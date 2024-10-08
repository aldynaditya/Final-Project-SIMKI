const { StatusCodes } = require('http-status-codes');
const { 
    getAllObat,
    getObatbyId,
    createObat,
    updateObat,
    deleteObat, 
    searchObat
} = require('../../../services/sequelize/obat');

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

const one = async (req, res, next) => {
    try {
        const result = await getObatbyId(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

const find = async (req, res, next) => {
    try {
        const result = await searchObat(req);
        
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
            data: 'Obat berhasil terhapus',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    index,
    one,
    find,
    update,
    destroy,
    create,
};
