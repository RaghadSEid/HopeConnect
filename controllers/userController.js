const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, phone, location, role, status } = req.body;

        if (!['sponsor', 'donor', 'volunteer', 'delivery', 'orphanages'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            name,
            email,
            password: hashedPassword, 
            phone,
            location,
            role,
            status: status || 'active',
            created_at: new Date()
        };

        const userId = await User.create(newUser);

        await User.insertToRoleTable(role, userId);

        res.status(201).json({ message: 'User created successfully', userId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.getUserById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUsersByRole = async (req, res) => {
    try {
        const role = req.params.role.toLowerCase();

        if (!['sponsor', 'donor', 'volunteer', 'delivery', 'orphanages'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role' });
        }

        const users = await User.getUsersByRole(role);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, phone, location, status } = req.body;

        const updatedFields = { name, phone, location, status };

        // إزالة الحقول undefined (يعني مش مرسلة)
        Object.keys(updatedFields).forEach(key => {
            if (updatedFields[key] === undefined) {
                delete updatedFields[key];
            }
        });

        if (Object.keys(updatedFields).length === 0) {
            return res.status(400).json({ error: 'No fields provided for update' });
        }

        await User.update(userId, updatedFields);

        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.softDeleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.softDelete(userId);

        res.status(200).json({ message: 'User status updated to suspended' });
    } catch (err) {
        res.status(500).json({ message: 'Error suspending user', error: err.message });
    }
};
