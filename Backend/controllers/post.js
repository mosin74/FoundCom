const Post = require('../models/Post');
const User=require('../models/User')

exports.createPost = async (req, res) => {
    try {
        const newPostData={
            caption:req.body.caption,
            image:{
                //dummy data for image obj
                public_id:"req.body.public_id",
                url:"req.body.url"
            },
            Owner:req.user._id
        }

        //Creating post
        const post=await Post.create(newPostData);
        //Geting user
        const user =await User.findById(req.user._id);
         
        //Pushing post in user posts and saving
        user.posts.push(post._id);
        await user.save();


        res.status(200).json({
            sucess:true,
            post
        })

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}