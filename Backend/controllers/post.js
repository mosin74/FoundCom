const Post = require('../models/Post');
const User = require('../models/User');
// const cloudinary = require("cloudinary");
const cloudinary = require('cloudinary').v2;

// exports.createPost = async (req, res) => {
//     try {

//         // const req.body.caption
//         // console.log(req.body.caption)
//         // const image=req.body.image
//         //chat gpt
//         // const base64Image = image.split(';base64,').pop();
//         // const imageBuffer = Buffer.from(base64Image, 'base64');

//         //    console.log(image)
//         //     const myCloud = await cloudinary.v2.uploader.upload(image, {
//         //         folder: "posts",
//         //     });

//         // console.log(myCloud.secure_url)

//         const buffer = Buffer.from(req.body.image, 'base64');
//         const myCloud = await cloudinary.v2.uploader.upload_stream(image, {
//             folder: "posts",
//         });

//         const newPostData = {
//             caption: req.body.caption,
//             image: {
//                 //dummy data for image obj
//                 public_id: 'myCloud.public_id',
//                 url: 'myCloud.secure_url'
//             },
//             Owner: req.user._id
//         }

//         //Creating post
//         const post = await Post.create(newPostData);
//         //Geting user
//         const user = await User.findById(req.user._id);

//         //Pushing post in user posts and saving
//         user.posts.push(post._id);
//         await user.save();


//         res.status(200).json({
//             sucess: true,
//             post
//         })


//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         })
//     }
// }

// chat  GPT
exports.createPost = async (req, res) => {
    try {

        // Convert the base64 string to a buffer
        const buffer = Buffer.from(req.body.image, 'base64');
        
        console.log("Buffer is created");

        // Upload the image to Cloudinary
        cloudinary.uploader.upload_stream({ folder: 'posts' }, async (error, result) => {
            console.log("Entered in uploader");
            if (error) {
                return res.status(500).json({ success: false, message: error.message });
            }
            console.log("Img uploaded success");

            const newPostData = {
                caption: req.body.caption,
                image: {
                    public_id: result.public_id,
                    url: result.secure_url,
                },
                owner: req.user._id,
            };

            // Create a new post
            const post = await Post.create(newPostData);
            console.log("Post created");

            // Get the user by ID
            const user = await User.findById(req.user._id);

            // Push the new post ID to the user's posts array and save the user
            user.posts.push(post._id);
            await user.save();
            console.log("Saved");

            res.status(200).json({
                success: true,
                post,
            });
        }).end(buffer);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};




exports.likeDislikepost = async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        console.log(post);

        if (!post) {
            return res.status(404).json({
                sucess: false,
                message: "post not found"
            });
        }
        //Why   ==> user._id 
        if (post.likes.includes(req.user._id)) {
            const index = post.likes.indexOf(req.user._id)
            post.likes.splice(index, 1);
            await post.save()
            return res.status(200).json({
                success: true,
                message: "Post disliked"
            })
        }
        else {
            post.likes.push(req.user._id);
            await post.save();
            return res.status(200).json({
                success: true,
                message: "Post liked"
            })

        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}




exports.deletPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);


        if (!post) {

            return res.status(404).json({
                sucess: false,
                message: "post not found"
            })
        }


        if (post.Owner.toString() != req.user._id.toString()) {
            return res.status(401).json({
                sucess: false,
                message: "Unauthorized"
            })
        }



        // await port.remove({})//this method is no more in moongoose new version changed to deleteOne or deleteMany
        await post.deleteOne()


        const user = await User.findById(req.user._id)
        const index = user.posts.indexOf(req.params.id)



        // ==>We can use any one of them for removing from user posts array 

        // await user.posts.pull({_id:req.params.id})
        await user.posts.splice(index, 1)


        await user.save()

        return res.status(200).json({
            success: true,
            message: "Post deleted",
            user
        })

    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: error.message
        })
    }

}

exports.getpost = async (req, res) => {

    try {

        // ==> This is 1 approch 
        //   const user=await User.findById(req.user._id).populate("following","posts")
        // //   const post=await Post.find({})
        // res.status(200).json({
        //     success:true,
        //     // user
        //     following:user.following
        // })

        // ==> This is 2 approch 
        const user = await User.findById(req.user._id);
        const posts = await Post.find({
            Owner: {
                $in: user.following
            }
        }).populate("Owner likes comments.user")
        res.status(200).json({
            success: true,
            posts
        })




    } catch (error) {

        return res.status(500).json({
            sucess: false,
            message: error.message
        })

    }
}


exports.updateCaption = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not exists"
            })
        }
        if (post.Owner.toString() !== req.user._id.toString()) {
            return res.status(404).json({
                success: false,
                message: "Unauthorised"
            })
        }

        post.caption = req.body.caption;
        await post.save();
        console.log(post.caption)

        res.status(200).json({
            success: true,
            message: "Caption updated"

        })
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: error.message
        })
    }
}



//Add and update comment 
exports.AddComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        //Updating comment if already comment is present 
        const commentFound = post.comments.find(comment => comment.user = req.user._id);

        if (commentFound) {
            commentFound.comment = req.body.comment;
            await post.save();
            return res.status(200).json({
                success: true,
                message: "comment updated"
            })
        }

        //If commenct not present then it is posted 
        else {
            post.comments.push({
                user: req.user._id,
                comment: req.body.comment,
            });

            await post.save();

            return res.status(200).json({
                success: true,
                message: "Comment is added"
            })
        }


        // If any error this will throw error   
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: error.message
        })
    }

}



//Remove from fllowers following left 

exports.deletMyProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        //This delete all post of user
        await Post.deleteMany({ Owner: req.user._id });

        //Log OutUser
        const option = {
            expires: new Date(Date.now()),
            httpOnly: true
        }
        res.cookie("token", null, option);

        //Deleting User
        await user.deleteOne()

        //Sending response 
        res.status(200).json({
            sucess: true,
            message: "User and all post are deleted"
        })
        // await user.deleteOne();




    } catch (error) {

        return res.status(500).json({
            sucess: false,
            message: error.message
        })
    }
}


exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("posts");

        res.status(200).json({
            success: true,
            user,
        })

    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: error.message
        })
    }

}