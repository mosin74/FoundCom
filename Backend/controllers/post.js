const Post = require('../models/Post');


exports.createPost = async (req, res) => {
    try {
        const newPostData={
            caption:req.body.caption,
            image:{
                public_id:"req.body.public_id",
                ref:"req.body.url"
            },
            Owner:req.user._id
        }


        const newPost=await Post.create(newPostData);

        res.status(200).json({
            sucess:true,
            post:newPost
        })

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}