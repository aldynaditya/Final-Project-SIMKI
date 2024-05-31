const { UnauthorizedError } = require('../errors');
const { UserKlinik } = require('../api/v1/userKlinik/model');
const { Role } = require('../api/v1/role/model');

const checkRole = (roleName) => {
    return async (req, res, next) => {
        try {
            const user = await UserKlinik.findByPk(req.user.id, {
                include: {
                    model: Role,
                    where: { name: roleName }
                }
            });

            if (!user) {
                throw new UnauthorizedError('Unauthorized to access this route');
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};

module.exports = checkRole;
