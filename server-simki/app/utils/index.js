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
const {
    generateNoEMR
} = require('./emrNumber')

module.exports = {
    getDayOfWeek,
    getNextVersion,
    generateInvoiceNumber,
    generateNoEMR,
    createJWT,
    isTokenValid,
    createTokenUser,
    createTokenPasien,
};