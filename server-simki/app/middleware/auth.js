const { User, Role, Permission } = require('../api/v1/userKlinik/model');

const checkPermission = (permissionName) => {
    return async (req, res, next) => {
        const user = await User.findByPk(req.user.id, {
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
    };
};

module.exports = { checkPermission };
