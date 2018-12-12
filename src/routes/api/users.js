import express from "express";
import gravatar from "gravatar";
import passport from "passport";

import User from "../../models/User";

import validateRegistration from "../../validation/register";
import validateLogin from "../../validation/login";

const router = express.Router();

/**
 *  @route        GET api/users/test
 *  @description  Test post route
 *  @access       Public
 */
router.get("/test", (req, res) => res.json({ message: "Users Works" }));

/**
 *  @route        GET api/users/register
 *  @description  Register  user
 *  @access       Public
 */
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegistration(req.body);

  // check validation
  if (!isValid) return res.status(400).json(errors);

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exist.";
      res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar
      });
      newUser.setPassword(req.body.password);
      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  });
});

/**
 *  @route        GET api/users/login
 *  @description  Login User / Returning JWT Token
 *  @access       Public
 */
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  // check validation
  if (!isValid) return res.status(400).json(errors);

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found!";
      return res.status(404).json(errors);
    }

    // Check password
    if (user.isValidPassword(password)) {
      // User matched
      const payload = { id: user.id, name: user.name, avatar: user.avatar };
      // Sign Token
      res.json({ success: true, token: `Bearer ${user.generateJWT(payload)}` });
    } else {
      errors.password = "Incorrect password!";
      res.status(400).json(errors);
    }
  });
});

/**
 *  @route        GET api/users/current
 *  @description  Returns current user
 *  @access       Private
 */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

export default router;
