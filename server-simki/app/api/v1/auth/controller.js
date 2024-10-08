const { StatusCodes } = require('http-status-codes');
const { 
    signin
} = require('../../../services/sequelize/auth');

const signinCms = async (req, res, next) => {
    try {
        const result = await signin(req);

        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { signinCms };