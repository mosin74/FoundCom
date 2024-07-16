const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors")
const bodyParser = require('body-parser');


//Configuring Env
if (process.env.NODE_ENV !== "production") {

    require('dotenv').config({ path: "Backend/config/config.env" });
}


//Using middleware
// app.use(express.json());
// app.use(express.urlencoded({ limit:'100mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(cors());

//Importing Routes
const post = require("./routes/post")
const user = require("./routes/user");


//Using Routes
app.use("/api/v1", post)
app.use("/api/v1", user)


module.exports = app;
