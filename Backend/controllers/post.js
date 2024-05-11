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




exports.likeDislikepost=async(req,res)=>{

    try {
    const post=await Post.findById(req.params.id);
    console.log(post);

        if(!post){
         return res.status(404).json({
             sucess:false,
             message:"post not found"
         });
     }
     //Why   ==> user._id 
    if(post.likes.includes(req.user._id)){
         const index=post.likes.indexOf(req.user._id)
         post.likes.splice(index,1);
         await post.save()
         return res.status(200).json({
             success:true,
             message:"Post disliked"
         })
    }
    else{
         post.likes.push(req.user._id);
         await post.save();
         return res.status(200).json({
             success:true,
             message:"Post liked"
         })
     
    }
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
   
}




exports.deletPost=async (req,res)=>{
try {
    const post = await Post.findById(req.params.id);


    if(!post){

        return res.status(404).json({
            sucess:false,
            message:"post not found"
        })
    }


    if(post.Owner.toString()!=req.user._id.toString()){
        return res.status(401).json({
            sucess:false,
            message:"Unauthorized"
        })
    }

 
   
        // await port.remove({})//this method is no more in moongoose new version changed to deleteOne or deleteMany
        await post.deleteOne()


        const user=await User.findById(req.user._id)
        const index=user.posts.indexOf(req.params.id)
        

        
// ==>We can use any one of them for removing from user posts array 

        // await user.posts.pull({_id:req.params.id})
        await user.posts.splice(index,1)


        await user.save()

        return res.status(200).json({
            success:true,
            message:"Post deleted",
            user
        })
    
} catch (error) {
    return res.status(500).json({
        sucess:false,
        message:error.message
    })
}
   
}