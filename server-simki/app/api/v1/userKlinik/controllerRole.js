const { Role, Permission } = require('./model');

exports.createRole = async (req, res) => {
    try {
        const { name, permissions } = req.body;
        const role = await Role.create({ name });
        if (permissions && permissions.length > 0) {
            const perms = await Permission.findAll({ where: { name: permissions } });
            await role.addPermissions(perms);
            }
        res.status(201).json({ message: 'Role created successfully', role });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.assignRoleToUser = async (req, res) => {
    try {
        const { userId, roleName } = req.body;
        const user = await User.findByPk(userId);
        const role = await Role.findOne({ where: { name: roleName } });
        await user.addRole(role);
        res.status(200).json({ message: 'Role assigned to user successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
