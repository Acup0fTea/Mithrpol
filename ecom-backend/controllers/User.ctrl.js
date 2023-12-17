const User = require('../models/User.model');
const asyncHandler = require('express-async-handler');

const createUser = async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({email: email});
    if (!findUser) {
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    else {
        throw new Error('User already exists');
    }
};
const loginUserCtrl = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const findUser = await User.findOne({email: email});
    if (findUser) {
        const isPasswordMatched = await findUser.isPasswordMatched(password);
        if (isPasswordMatched) {
            res.json(findUser);
        }
        else {
            throw new Error('Invalid password');
        }
    }
    else {
        throw new Error('User not found');
    }
});

module.exports = { createUser, loginUserCtrl };