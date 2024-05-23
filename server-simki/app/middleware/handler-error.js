const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log('err');
    console.log(err.message);
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, try again later',
    };

    if (err.name === 'SequelizeValidationError') {
        customError.msg = err.errors
            .map((item) => item.message)
            .join(', ');
        customError.statusCode = 400;
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        customError.msg = `Duplicate value entered for ${Object.keys(err.fields).join(', ')} field, please choose another value`;
        customError.statusCode = 400;
    }

    if (err.name === 'SequelizeDatabaseError' && err.message.includes('invalid input syntax for type uuid')) {
        customError.msg = `No item found with id: ${err.value}`;
        customError.statusCode = 404;
    }

    return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
