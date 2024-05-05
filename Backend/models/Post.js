const mongoose=require('mongoose')


//Post schema is created 

const postSchema= new mongoose.Schema({
    caption:String,

    image:{
        public_id:String,
        url:String
    },

    Owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    likes:[
        {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
        },
    ],
    comments:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            comment:{
                type:String,
                required:true,
            },
        }
    ]

});

module.exports=mongoose.model("Post",postSchema)