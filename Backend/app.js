const express= require("express");
const app=express();

//Configuring Env
if(process.env.NODE_ENV!=="production"){

    require('dotenv').config({path: "Backend/config/config.env"});
}


//Using middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Importing Routes
const post=require("./routes/post")
const user=require("./routes/user")

//Using Routes
app.use("/api/v1",post)
app.use("/api/v1",user)


module.exports=app;
