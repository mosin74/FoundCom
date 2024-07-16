const User = require('../models/User')
const bcrypt = require('bcrypt')
exports.register = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        console.log(name)
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

        const token = await user.generateToken();
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.status(201).cookie("token", token, options).json({
            sucess: true,
            user,
            token,
            message: "Usered login and register sucessfully "
        })



    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message,
        })
    }
}




exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");

        //or used as follow for select:false password
        // const user=await User.findOne({email},{email:1,name:1,password:1,avatar:1})

        if (!user) {
            return res.status(400).json({
                sucess: false,
                message: "User does not exist"
            });
        }




        //Created in user models
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({
                sucess: false,
                message: "Incorrect password",
            });
        };

        //Generating token
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        const token = await user.generateToken();
        res.status(200).cookie("token", token, options)
            .json({
                sucess: true,
                user,
                token
            });
        // console.log(token)
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message
        })

    }
}

exports.logOut = async (req, res) => {

    const option = {
        expires: new Date(Date.now()),
        httpOnly: true,
    }
    try {

        res.status(200).cookie("token", null, option).json({
            sucess: true,
            message: "Logout sucessfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.followUser = async (req, res) => {
    try {

        const logedInUser = await User.findById(req.user._id)
        const usertoFollow = await User.findById(req.params.id)

        console.log("userLogedIN:", logedInUser)
        console.log("userTOfollow:", usertoFollow)


        if (!usertoFollow) {
            return res.status(404).json({
                sucess: false,
                message: "User not exist"
            })
        }
        if (req.user._id == req.params.id) {
            return res.status(404).json({
                sucess: false,
                message: "Can not follow self"
            })
        }
        if (logedInUser.following.includes(req.params.id)) {
            return res.status(404).json({
                sucess: false,
                message: "Use already followed"
            })
        }
        logedInUser.following.push(usertoFollow._id)
        usertoFollow.follwers.push(logedInUser._id)

        await logedInUser.save();
        await usertoFollow.save();


        return res.status(200).json({
            success: true,
            message: "Follwed Success"
        })



    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: error.message
        })
    }
}
exports.updatePassword = async (req, res) => {

    try {
        const user = await User.findById(req.user._id).select("+password");

        const { oldPassword, newPassword } = req.body;

        if(!oldPassword || !newPassword){
            res.status(404).json({
                sucess: false,
                message: "Please enter old and new Password"
            })
        }        
        if(oldPassword == newPassword){
            res.status(404).json({
                sucess: false,
                message: "Please Enter differnet newPassword "
            })
        }
        const isMatch = await user.matchPassword(oldPassword)
        if (!isMatch) {
            res.status(404).json({
                sucess: false,
                message: "Incorrect password"
            })
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            sucess:true,
            message:"Password change sucessfully"
        })



    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: error.message
        })
    }
}


exports.updateProfile = async (req,res)=>{
    try {
        const user=await User.findById(req.user._id)
        const {name,email}=req.body
        if(name)user.name=name;
        if(email)user.email=email;

        //TO DO AVTAR

        await user.save();

        res.status(200).json({
            sucees:true,
            message:"Profie updated"
        })


        
    } catch (error) {

        return res.status(500).json({
            sucess: false,
            message: error.message
        })
    }
}


//For getting all users

exports.getAllUsers = async(req,res)=>{

    try {
        const users= await User.find({});
        res.status(200).json({
            success:true,
            users
        })
        
    } catch (error) {

        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}