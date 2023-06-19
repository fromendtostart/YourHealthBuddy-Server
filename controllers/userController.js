//async handler middleware for exceptions

import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/Users.js";

const register = asyncHandler (async (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password){
    res.status(400);
    throw new Error("Add all fields");
    }

    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    const user = await User.create({
        name,
        email, 
        password: hashed
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error("Invalid data");
    }
})

const login = asyncHandler (async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("Invalid credentials");
    }

})

const getme = (async (req, res) => {
    //access to id due to middleware
    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name,
        email,
    })
})

//generate jwt 

const generateToken = (id) => {
    return jsonwebtoken.sign({id}, process.env.JWT_SECRET, 
        {
        expiresIn: "30d",
    })
}

const authResponse = {
    
}

export {register, login, getme};