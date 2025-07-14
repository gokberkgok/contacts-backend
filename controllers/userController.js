const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//@desc Get All users
//@route GET /api/users
//@access public
const getUsers = asyncHandler(async (req,res) => {
    const users = await User.find();
    res.status(200).json(users);
});

//@desc Register user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req,res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are must be fill");
    }
    const userAvailable = await User.findOne({ email });
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered!");
    }
    const hashedPw = await bcrypt.hash(password, 10);
    console.log("Hashed password : " , hashedPw);
    const user = await User.create({
        username,email,password: hashedPw   
    });
    console.log(`User created ${user}`)
    if(user){
        res.status(201).json({ _id: user.id, email: user.email });
    }else{
        res.status(400);
        throw new Error("User data not valid");
    }
    //res.status(200).json({ message : "Register user"});
});
//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req,res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are must be fill");
    }
    const user = await User.findOne({ email });
    if(!user){
        res.status(400).json({message: "Email not found"})
    }else{
        const comparePw = await bcrypt.compare(password, user.password);
        if (comparePw){
        const accessToken = jwt.sign({
            user : {
                id : user.id,
                username: user.username,
                email : user.email,
            },
            }, process.env.SECRET_ACCESS_TOKEN,
            { expiresIn : "15m" }
        );
        res.status(200).json({accessToken, _id: user.id, username : user.username, email: user.email });
        }else{
            res.status(401);
            throw new Error("Email or password is not valid!");
        }
    }
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


const currentUser = asyncHandler(async (req,res) => {
    res.status(200).json(req.user);
});

module.exports ={
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    registerUser,
    loginUser,
    currentUser
}