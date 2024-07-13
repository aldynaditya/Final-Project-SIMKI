const { StatusCodes } = require('http-status-codes');
const {
    getAllLaporan, 
    createLaporan,
    getAllLaporanByPimpinan,
    updateStatusLaporan
} = require('../../../services/sequelize/laporan');

const index = async (req, res, next) => {
    try {
        const result = await getAllLaporan(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const result = await createLaporan(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const indexByPimpinan = async (req, res, next) => {
    try {
        const result = await getAllLaporanByPimpinan(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

const acceptedByPimpinan = async (req, res, next) => {
    try {
        const result = await updateStatusLaporan(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    index,
    create,
    indexByPimpinan,
    acceptedByPimpinan
};
