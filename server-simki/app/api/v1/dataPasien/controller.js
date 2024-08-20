const { StatusCodes } = require('http-status-codes');
const { 
    getAllDataPasien,
    createDataPasien,
    getOneDataPasien,
    updateDataPasien,
    deleteDataPasien, 
    getDataPasienbyId
} = require('../../../services/sequelize/dataPasien');

const index = async (req, res, next) => {
    try {
        const result = await getAllDataPasien(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

const find = async (req, res, next) => {
    try {
        const result = await getDataPasienbyId(req);
        
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const search= async (req, res, next) => {
    try {
        const result = await getOneDataPasien(req);
        
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const result = await createDataPasien(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const destroy = async (req, res, next) => {
    try {
        const result = await deleteDataPasien(req);

        res.status(StatusCodes.OK).json({
            data: 'DataPasien berhasil terhapus',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    index,
    find,
    search,
    destroy,
    create,
};
