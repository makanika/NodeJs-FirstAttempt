const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//@desc Register a User
//@route POST /api/user/register
//@access Public

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body
    if(!username || !email || !password) {
        res.status(400)
        throw new Error("All Fields are Mandatory")
    }
    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("User already exists")
    }
//Create a HashPassword for the User
const hashedPassword = await bcrypt.hash(password, 10)
console.log("Hashed Password: ", hashedPassword)
const user = await User.create({
    username,
    email,
    password: hashedPassword
})
    console.log(`User created ${user}`)
    if(user){
        res.status(201).json({ _id: user.id, email: user.email })
    }else{
        res.status(400)
        throw new Error("User Information was not valid")
    }
    res.json({ message: "Register the User"})
})
//@desc Login a User
//@route POST /api/user/Login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(400)
            throw new Error("All Fields are mandatory")
        }
    const user = await User.findOne({email})
    //Compare Password with HashedValues
    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1m"}
        )
        res.status(200).json({ accessToken })
    }else {
        res.status(401)
        throw new Error("Email or Password Incorrect")
    }
    //res.json({ message: "Login the User"})
})
//@desc Current User Information
//@route POST /api/user/Logged In
//@access Private

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})

module.exports = { registerUser, loginUser, currentUser}