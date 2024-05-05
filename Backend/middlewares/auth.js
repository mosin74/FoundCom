
const User = require('../models/User');
const jwt=require('jsonwebtoken')

// Learn about authentication JWT

exports.isAuthenticated = async( req,res,next)=>{

   try {
    //Requesting cookies here "cookies parcer" is used
       const {token}=req.cookies;
       console.log(token)
    if(!token){
       return res.status(401).json({
            message:"please login first"
        });
    };
    //Verfiing user 
    const decode=await jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decode._id);

    next()
   } catch (error) {
    res.status(500).json({
        message:error.message
    })
   }
}