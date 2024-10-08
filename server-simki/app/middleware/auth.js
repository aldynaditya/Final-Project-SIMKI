const { UnauthenticatedError, UnauthorizedError } = require('../errors');
const { isTokenValid } = require('../utils/jwt');

const authenticateUser = async (req, res, next) => {
    try {
        let token;
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
        }

        if (!token) {
            throw new UnauthenticatedError('Authentication invalid');
        }

        const payload = isTokenValid({ token });
        console.log("Payload:", payload)
        req.user = {
            email: payload.email,
            role: payload.role,
            nama: payload.nama,
            id: payload.userId,
        };
        next();
    } catch (error) {
        next(error);
    }
};

const authenticatePasien = async (req, res, next) => {
    try {
        let token;
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
        }

        if (!token) {
            throw new UnauthenticatedError('Authentication invalid');
        }

        const payload = isTokenValid({ token });
        console.log("Payload:", payload)
        
        req.pasien = {
            email: payload.email,
            role: payload.role,
            nama: payload.nama,
            pasienId: payload.pasienId,
        };
        next();
    } catch (error) {
        next(error);
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError('Unauthorized to access this route');
        }
        next();
    };
};

module.exports = { 
    authenticateUser,
    authenticatePasien, 
    authorizeRoles 
};
