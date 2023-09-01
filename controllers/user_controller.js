const User = require('../models/user_model');
const sendToken = require("../utils/jwtToken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    const userIfExists = await User.findOne({
        email: email,
    });

    if (userIfExists) {
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
    });

    sendToken(user, 201, res);
}


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email,
        });

        if (!user) {
            res.status(400).json({
                success: false,
                message: "User not Found",
            });
            return;
        }

        const isPasswordMatched = bcrypt.compareSync(password, user.password);

        if (!isPasswordMatched) {
            res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
            return;
        }

        sendToken(user, 200, res);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

exports.logoutUser = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            Credentials: true,
            sameSite: "none",
            secure: true
        });

        res.status(200).json({
            success: true,
            message: "Log out success",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

exports.getCurrentlyLoggedInUser = async (req, res) => {
    try {
        const user = await User.find({
            _id: req.user._id,
        }, "-password");

        if (!user) {
            res.status(401).json({
                success: false,
                message: "User not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}