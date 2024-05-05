const mongoose = require('mongoose');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
// const validator=require('vali')
const Modified=require('package-changed')

// userSchema is created and in this password select:false it means we cannot access password without changing password status 

const userSchema=new mongoose.Schema({
       name:{
        type:String,
        required:[true,"Please Enter a name"],
       },
       avatar:{
            public_id:String,
            url:String,
       },
       email:{
        type:String,
        required:[true,"Please enter a email"],
        unique:[true,"Email already exists"],
       },
       password:{
           type:String,
           required:[true,"Please enter a password"],
           minilength:[6,"Password must be at least 6 characters"],
           select:false,
       },
       posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
       ],
       follwers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
       ],
       following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
       ]

});

//This async function is used for encryption or hashing of passsword whenever password is changing 
userSchema.pre("save",async function (next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
    }

    //Learn about next
    next();
});

//While loging this function is used to check or verify the password is correct 

userSchema.methods.matchPassword=async function(password){
    // console.log(this.password,this.email,this.name,password)
    return await bcrypt.compare(password,this.password); //In this ==> this.password state(select:false) is changed when we find user and try to access this 
}

//JWT generatToken function method 
userSchema.methods.generateToken=function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET)
} 


module.exports=mongoose.model("User",userSchema);
