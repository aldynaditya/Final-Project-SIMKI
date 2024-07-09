const { StatusCodes } = require('http-status-codes');
const { 
    getAllSuratSakit,
    updateSuratSakit,
    updateStatusbyDoctor
} = require('../../../services/sequelize/notifikasiSurat');

const index = async (req, res, next) => {
    try {
        const result = await getAllSuratSakit(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const result = await updateSuratSakit(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const accepted = async (req, res, next) => {
    try {
        const result = await updateStatusbyDoctor(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    index,
    update,
    accepted
};
