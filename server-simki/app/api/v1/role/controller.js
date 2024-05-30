const { getAllRole, createRole } = require('../../../services/sequelize/role');
const { StatusCodes } = require('http-status-codes');

const index = async (req, res, next) => {
    try {
        const result = await getAllRole(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }

};

const create = async (req, res, next) => {
    try {
        const result = await createRole(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

// const assignPermission = async (req, res) => {
//     try {
//         const { roleName, permissionName } = req.body;
//         const role = await Role.findOne({ where: { name: roleName } });
//         const permission = await Permission.findOne({ where: { name: permissionName } });
//         await role.addPermission(permission);
//         res.status(200).json({ message: 'Permission assigned successfully' });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

module.exports = { index, create };