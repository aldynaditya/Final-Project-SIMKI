const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    urlDb: process.env.URL_MYSQL_DEV,
    jwtExpiration: process.env.JWT_EXPIRATION,
    jwtSecret: process.env.JWT_SECRET_KEY,
    gmail: process.env.GMAIL,
    password: process.env.PASS,
    urlResetPassword: process.env.URL_RESET_PASSWORD,
};