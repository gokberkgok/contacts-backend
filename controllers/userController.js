const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

//@desc Get All users
//@route GET /api/users
//@access public
const getUsers = asyncHandler(async (req,res) => {
    const users = await User.find();
    res.status(200).json(users);
});


//@desc Get user from id
//@route GET /api/users/:id
//@access public
const getUser = asyncHandler(async (req,res) => {
    const user = await User.find();
    res.status(200).json(user);
});

//@desc Create new user
//@route POST /api/users
//@access public
const createUser = asyncHandler(async (req,res) => {
    const user = await User.find();
    res.status(200).json(user);
});

//@desc Update user from id
//@route PUT /api/users/:id
//@access public
const updateUser = asyncHandler(async (req,res) => {
    const user = await User.findById(req.params.id);
    if (!user){
        res.status(404); 
        throw new Error("User not found");
    }
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id, req.body, {new: true}
    );
    res.status(200).json(updatedUser);
});

//@desc Delete user from id
//@route DELETE /api/users/:id
//@access public
const deleteUser = asyncHandler(async (req,res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user){
        res.status(404); 
        throw new Error("User not found");
    }
    res.status(200).json(user);
});

module.exports ={
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}