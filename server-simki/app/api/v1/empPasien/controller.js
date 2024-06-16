const { StatusCodes } = require('http-status-codes');
const { 
    getAllEMRPasien
} = require('../../../services/sequelize/emrPasien');

const index = async (req, res, next) => {
    try {
        const result = await getAllEMRPasien(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    index
}