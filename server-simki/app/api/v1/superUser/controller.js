const { 
    createSuperUser,
    createUsers,
    getAllUserKlinik, 
} = require('../../../services/sequelize/userKlinik');
const { StatusCodes } = require('http-status-codes');

const createCMSsuperuser = async (req, res, next) => {
    try {
        const result = await createSuperUser(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const createCMSusers = async (req, res, next) => {
    try {
        const result = await createUsers(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const getCMSusers = async (req, res, next) => {
    try {
        const result = await getAllUserKlinik(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

module.exports = {  
    createCMSsuperuser,
    createCMSusers,
    getCMSusers 
};
