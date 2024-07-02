const express=require('express');
const { register, login, followUser, logOut, updateProfile, updatePassword, getAllUsers } = require('../controllers/user');
const {isAuthenticated}=require('../middlewares/auth');
const { deletMyProfile, getUserProfile } = require('../controllers/post');


const router=express.Router();

router.route("/register").post(register)

router.route("/login").post(login)

router.route("/follow/:id").get(isAuthenticated,followUser)

router.route("/logout").get(isAuthenticated,logOut)

router.route("/update/profile").put(isAuthenticated,updateProfile)

router.route("/update/password").put(isAuthenticated,updatePassword)

router.route("/delete/me").delete(isAuthenticated,deletMyProfile)

router.route("/myprofile").get(isAuthenticated,getUserProfile)

router.route("/users").get(isAuthenticated,getAllUsers)


module.exports=router