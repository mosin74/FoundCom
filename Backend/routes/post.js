const express = require('express');
const { createPost, likeDislikepost, deletPost, getpost, updateCaption, AddComments} = require("../controllers/post");
const { isAuthenticated } = require('../middlewares/auth');
const { allUserPost } = require('../controllers/user');

// const multer=require('multer')

const router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPost);

router
    .route("/post/:id")
    .get(isAuthenticated, likeDislikepost)
    .delete(isAuthenticated, deletPost)
    .put(isAuthenticated, updateCaption)

router.route("/posts").get(isAuthenticated, getpost)

router.route("/posts/comment/:id").put(isAuthenticated,AddComments)

router.route("/profile/:id").get(isAuthenticated,allUserPost)

module.exports = router;