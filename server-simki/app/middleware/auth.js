const { User, Role, Permission } = require('../api/v1/userKlinik/model');
const jwt = require('jsonwebtoken');

const checkPermission = (permissionName) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'your_jwt_secret');
            const user = await User.findByPk(decoded.id, {
                include: {
                    model: Role,
                    include: Permission,
                },
            }); 

            const hasPermission = user.Roles.some(role =>
                role.Permissions.some(permission => permission.name === permissionName)
                );

            if (hasPermission) {
                next();
            } else {
                res.status(403).json({ message: 'Forbidden' });
            }
        } catch (error) {
            res.status(401).json({ message: 'Unauthorized' });
        }
    };
};

module.exports = { checkPermission };
