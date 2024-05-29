const { UserKlinik, Role, Permission } = require('./model');
const argon2 = require('argon2');

exports.register = async (req, res) => {
try {
    const { name, email, password, role } = req.body;
    const user = await UserKlinik.create({ name, email, password });
    if (role) {
        const userRole = await Role.findOne({ where: { name: role } });
        await user.addRole(userRole);
    }
    res.status(201).json({ message: 'User registered successfully', user });
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Generate token (JWT or other) and send response
    res.json({ message: 'Login successful', user });
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};
