const User = require('../models/user');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/mailer');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// User Registration
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({ name, email, password });
        await user.save();

        // Generate OTP
        const otp = crypto.randomBytes(3).toString('hex');
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();

        // Send Email
        await sendEmail({
            to: user.email,
            subject: 'Email Verification',
            text: `Your OTP is ${otp}`
        });

        res.status(201).json({ message: 'User registered, check email for OTP' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Email Verification
exports.verifyEmail = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.isEmailVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// User Login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !user.isEmailVerified) {
            return res.status(400).json({ message: 'Invalid credentials or email not verified' });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
