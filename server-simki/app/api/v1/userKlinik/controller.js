const { 
    createUserKlinik, 
    getAllUserKlinik} = require('../../../services/sequelize/userKlinik');
const { StatusCodes } = require('http-status-codes');

const index = async (req, res, next) => {
    try {
        const result = await getAllUserKlinik(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }

};

const create = async (req, res, next) => {
    try {
        const result = await createUserKlinik(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { index, create };
