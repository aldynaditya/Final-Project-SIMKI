const {
    createJWT,
    isTokenValid,
} = require('./jwt');
const {
    createTokenUser,
    createTokenPasien,
} = require('./createTokenUser');

module.exports = {
    createJWT,
    isTokenValid,
    createTokenUser,
    createTokenPasien,
};