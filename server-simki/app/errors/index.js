const CustomAPIError = require('./custom-api-error');
const BadRequestError = require('./bad-request');
const NotFoundError = require('./not-found');
const UnauthorizedError = require('./unauthorized');
const UnauthenticatedError = require('./unauthenticated');
const ForbiddenError = require('./forbidden');

module.exports = {
    CustomAPIError,
    BadRequestError,
    NotFoundError,
    UnauthenticatedError,
    UnauthorizedError,
    ForbiddenError
}