const User = require('../models/User');
const Note = require('../models/Note');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

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
    const hashPwd = await bcrypt.hash(password, 10) //salt round

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
    
});

//@desc Delete a User
//@route Delete /users
//@acess Private
const deleteUser = expressAsyncHandler(async (req, res) => {
    
});

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
};
