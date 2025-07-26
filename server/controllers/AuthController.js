const User = require("../models/User");
const { genSalt, hash, compare } = require("bcryptjs");
const genToken = require("../lib/genToken");

const registerUser = async(req, res) => {
    try {

        const { full_name, email, password } = req.body;

        if(!full_name || !email || !password) return res.json({
            success: true,
            message: "All fields are required!"
        });

        if(password.length < 8) return res.json({
            success: true,
            message: "Password must be at least 8 characters!"
        });

        const user = await User.findOne({ email });

        if(user) return res.json({
            success: true,
            message: "User with same email already exists. Try again with different credentials!"
        });

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        const newUser = await User({
            full_name,
            email,
            password: hashedPassword
        });

        if(!newUser) return res.json({
            success: true,
            message: "Error while creating user!"
        });

        await newUser.save();

        const token = genToken(newUser._id);

        return res.json({
            success: true,
            message: "User created successfully",
            token
        });

    } catch(e) {
        return res.json({
            success: false,
            message: e
        });
    }
};

const loginUser = async(req, res) => {
    try {

        const { email, password } = req.body;

        if(!email || !password) return res.json({
            success: true,
            message: "All fields are required!"
        });

        const user = await User.findOne({ email });

        if(!user) return res.json({
            success: true,
            message: "User with given email does not exist!"
        });

        const verifyPassword = await compare(password, user.password);

        if(!verifyPassword) return res.json({
            success: true,
            message: "Password does not match!"
        });

        const token = genToken(user._id);

        return res.json({
            success: true,
            message: "User logged in successfully",
            token
        });

    } catch(e) {
        return res.json({
            success: false,
            message: e
        });
    }
};

const checkAuth = async(req, res) => {
    try {

        return res.json(req.user);

    } catch(e) {
        return res.json({
            success: false,
            message: e
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    checkAuth
};