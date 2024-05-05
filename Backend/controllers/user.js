const User = require('../models/User')
const bcrypt=require('bcrypt')
exports.register= async (req, res) => {
    try {
        const { name, email, password } =req.body;

        let user = await User.findOne({ email });
        if (user) res.status(404).json({ sucess: false, message: 'User already exists' });

        user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: "sample_id",
                url: "sample_url"
            }
        });
          
        // ==> used of register only 
        // res.status(201).json({
        //     sucess:true,
        //     user
        // })


        // ==> used of register and login directly

        const token=await user.generateToken();
        const options={
            expires: new Date(Date.now()+90*24*60*60*1000),
            httpOnly:true
        }
        res.status(201).cookie("token",token,options).json({
              sucess:true,
              user,
              token,
              message:"Usered login and register sucessfully "
        })



    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message,
        })
    }
} 




exports.login=async(req,res)=>{
try{
    const {email,password}=req.body;
    const user=await User.findOne({email}).select("+password");

    //or used as follow for select:false password
    // const user=await User.findOne({email},{email:1,name:1,password:1,avatar:1})

    if(!user){
        return res.status(400).json({
            sucess:false,
            message:"User does not exist"
        });
    }




//Created in user models
    const isMatch=await user.matchPassword(password);
    if(!isMatch){
        return res.status(400).json({
            sucess:false,
            message:"Incorrect password",
        });
    };



//Generating token
    const options={
        expires:new Date(Date.now()+90*24*60*60*1000),
        httpOnly:true
         }
    const token=await user.generateToken();
    res.status(200).cookie("token",token,options)
        .json({
        sucess:true,
        user,
        token
    });
    // console.log(token)
}catch(error){
    res.status(500).json({
        sucess:false,
        message:error.message
    })

}
} 
