import jsonwebtoken from "jsonwebtoken"
import User from "../models/Users.js"
import asyncHandler from "express-async-handler"

const protect = asyncHandler (async (req, res, next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]
            const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
            //get user
            //there is id in token as that is what we signed it with in userController

            //we can access req.user in any route that's protected due to this
            req.user = await User.findById(decoded.id).select('-password')
            //-password as we won't have req.user.password etc
            next()
        } catch(error){
            console.log(error)
            res.status(401)
            throw new Error("Not authorized")
        }
    }

    if(!token){
        res.status(401)
        throw new Error("Not authorized, no token")
    }
})

export default protect;