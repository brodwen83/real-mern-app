import express from "express";
import mongoose from "mongoose";
import passport from "passport";

import Post from "../../models/Post";
import Profile from "../../models/Profile";

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
    .then(post => {
      // check if there is post. sometimes returns null
      if (!post) return res.status(404).json({ nopostfound: "Post Not Found" });
      // send the post
      res.json(post);
    })
    .catch(err => res.status(404).json({ nopost: "Post not found" }));
});

/**
 *  @route        GET api/posts
 *  @description  Create post
 *  @access       Private
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

/**
 *  @route        DELETE api/posts/:id
 *  @description  Delete post by id
 *  @access       Private
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check post owner
          if (post.user.toString() !== req.user.id)
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });

          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
    });
  }
);

/**
 *  @route        POST api/posts/unlike/:id
 *  @description  Unlikes post
 *  @access       Private
 */
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          )
            return res
              .status(400)
              .json({ notliked: "You have not yet liked the post" });

          // Get the remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of the array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
    });
  }
);

/**
 *  @route        POST api/posts/like/:id
 *  @description  Likes post
 *  @access       Private
 */
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          )
            return res
              .status(400)
              .json({ alreadyliked: "User already like this post" });

          // Add user id to likes array
          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
    });
  }
);

/** Comments route handlers */

/**
 *  @route        POST api/posts/comment/:id
 *  @description  Add commment to a post
 *  @access       Private
 */
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInputs(req.body);
    // Check Validation
    if (!isValid)
      // Return any errors with 400 status
      return res.status(400).json(errors);

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add to comments  array
        post.comments.unshift(newComment);
        // Save post
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
  }
);

/**
 *  @route        POST api/posts/comment/:id/:comment_id
 *  @description  Remove commment from post
 *  @access       Private
 */
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if comment exist
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        )
          return res
            .status(404)
            .json({ commentnotexist: "Comment does not exist" });

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
  }
);

export default router;
