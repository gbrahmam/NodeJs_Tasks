const express = require("express");
const router = express.Router();
const Post = require("../model/post");
const bodyparser = require("body-parser");
router.use(bodyparser.json());

//here we will fetch all the post created by the user
router.get("/posts", async (req, res) =>{
    const posts = await Post.find({user: req.user});
    res.json({
        status: "success",
        posts
    });
})


//here we will allow user to create a ppst
router.post("/posts", async (req, res) => {
    const post = await Post.create({
        title: req.body.title,
        body: req.body.body,
        user: req.user
    })
    res.json({
        status: "success",
        post
    })
})

module.exports = router;