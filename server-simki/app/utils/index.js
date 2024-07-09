const {
    createJWT,
    isTokenValid,
} = require('./jwt');
const {
    createTokenUser,
    createTokenPasien,
} = require('./createTokenUser');
const {
    getDayOfWeek
} = require('./convertDatetoDay');
const {
    generateInvoiceNumber
} = require('./invoiceNumberGenerator');
const {
    getNextVersion
} = require('./letterVersion')

module.exports = {
    getDayOfWeek,
    getNextVersion,
    generateInvoiceNumber,
    createJWT,
    isTokenValid,
    createTokenUser,
    createTokenPasien,
};