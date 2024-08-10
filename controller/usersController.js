const User = require('../models/User');
const Note = require('../models/Note');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const salt = 10;

//@desc Get All Users
//@route Get /users
//@acess Private
const getAllUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean();

    if (!users) {
        return res.status(404).json({ message: "No users found" });
    }

    res.json(users);
});


//@desc Create a User
//@route Post /users
//@acess Private
const createNewUser = expressAsyncHandler(async (req, res) => {
    const { username, password, roles } = req.body;

    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const duplicate = await User.findOne({ username }).lean().exec();

    if (!duplicate) {
        return res.status(409).json({ message: "Duplicate username" });
    }

    //hash password
    const hashPwd = await bcrypt.hash(password, salt) //salt round

    const userObj = { user, "password": hashPwd, roles };

    const user = await User.create(userObj);

    if (user) {
        res.status(201).json({ message: `New User ${username} created` });
    } else {
        res.status(400).json({ message: "Invalid user data recieved" });
    }
});

//@desc Update a User
//@route Patch /users
//@acess Private
const updateUser = expressAsyncHandler(async (req, res) => {
    const { id, username, roles, active, password } = req.body;


    //confirm data
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active === 'boolean') {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const duplicate = await User.findOne({ username }).lean().exec();

    if (duplicate && duplicate?._id.toString() === id) {
        return res.status(409).json({ message: "Duplicate username" });
    }

    user.username = username;
    user.active = active;
    user.roles = roles;

    if (password) {
        user.password = await bcrypt.hash(password, salt);
    }

    const updateUser = await user.save();

    res.json({ message: `${updateUser.username} updated` });
});

//@desc Delete a User
//@route Delete /users
//@acess Private
const deleteUser = expressAsyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    const notes = await Note.findOne({ user: id }).lean().exec();

    if (notes?.length) {
        return res.status(400).json({ message: "User has assigned notes" });
    }

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const result = await user.deleteOne();

    const reply = `Username ${result.username} `
});

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
};
