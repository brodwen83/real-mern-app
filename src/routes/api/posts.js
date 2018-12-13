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
