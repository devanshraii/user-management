const User = require('../models/user');

// Get User Profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
    const { name, email } = req.body;

    try {
        let user = await User.findById(req.userId);

        if (user) {
            user.name = name || user.name;
            user.email = email || user.email;
            await user.save();

            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
