import express from "express";
import mongoose from "mongoose";
import passport from "passport";

import Post from "../../models/Post";

import validatePostInputs from "../../validation/post";

const router = express.Router();

/**
 *  @route        GET api/posts/test
 *  @description  Test post route
 *  @access       Public
 */
router.get("/test", (req, res) => res.json({ message: "User's Posts" }));

/**
 *  @route        GET api/posts
 *  @description  Get post
 *  @access       Public
 */
router.get("/", (req, res) => {
  Post.find({})
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noposts: "Error Fetching posts" }));
});

/**
 *  @route        GET api/posts/:id
 *  @description  Get post by id
 *  @access       Public
 */
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopost: "Post not found" }));
});

/**
 *  @route        GET api/posts
 *  @description  Create post
 *  @access       Public
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInputs(req.body);
    // Check Validation
    if (!isValid)
      // Return any errors with 400 status
      return res.status(400).json(errors);

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);

export default router;
