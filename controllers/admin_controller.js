const User = require('../models/user_model');
const sendToken = require("../utils/jwtToken");

exports.createAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const admin = await User.findOne({
            email: email,
        });
    
        if (admin) {
            res.status(400).json({
                success: false,
                message: "Email already exists",
            });
            return;
        }
    
        const user = await User.create({
            username,
            email,
            password,
            role: 'admin'
        });
    
        sendToken(user, 201, res);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

exports.createFaculties = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const faculty = await User.findOne({
            email: email,
        });

        if (faculty) {
            res.status(400).json({
                success: false,
                message: "Email already exists",
            });
            return;
        }

        const user = await User.create({
            username,
            email,
            password,
            role
        });

        sendToken(user, 201, res);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

exports.listUsers = async (req, res) => {
    try {
        const role = req.query.role || 'student';
        const users = await User.find({
            role: role
        });

        res.status(200).json({
            success: true,
            users
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            user,
            message: 'User deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { username, email, password, role } = req.body;

        const user = await User.findByIdAndUpdate(id, {
            username,
            email,
            password,
            role
        }, {
            new: true
        });

        res.status(200).json({
            success: true,
            user,
            message: 'User updated successfully'
        });
        
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}