const {UserKlinik, Role} = require('./model');

const createUser = async (req, res) => {
    try {
        const { name, password, role } = req.body;
        const user = await UserKlinik.create({ name, password, role });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const assignRole = async (req, res) => {
    try {
        const { userId, roleName } = req.body;
        const user = await UserKlinik.findByPk(userId);
        const role = await Role.findOne({ where: { name: roleName } });
        await user.addRole(role);
        res.status(200).json({ message: "Role assigned successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createUser, assignRole };
