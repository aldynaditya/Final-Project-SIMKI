const { 
    getAllRole,
    getAllPermission,
    createRole,
    createPermissiontoRole } = require('../../../services/sequelize/role');
const { StatusCodes } = require('http-status-codes');

const indexr = async (req, res, next) => {
    try {
        const result = await getAllRole(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }

};

const indexp = async (req, res, next) => {
    try {
        const result = await getAllPermission(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }

};

const create = async (req, res, next) => {
    try {
        const result = await createRole(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const assign = async (req, res) => {
    try {
        const result = await assignPermissiontoRole(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};


module.exports = { indexr, indexp, create, assign };