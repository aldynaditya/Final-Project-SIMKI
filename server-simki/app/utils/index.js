const {
    createJWT,
    isTokenValid,
} = require('./jwt');
const {
    createTokenUser,
    createTokenPasien,
    createTokenPassword,
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
const {
    validateTimeFormat,
    timesOverlap
} = require('./formattedTime')

module.exports = {
    getDayOfWeek,
    getNextVersion,
    generateInvoiceNumber,
    generateNoEMR,
    createJWT,
    isTokenValid,
    createTokenUser,
    createTokenPasien,
    createTokenPassword,
    validateTimeFormat,
    timesOverlap
};