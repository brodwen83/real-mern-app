import express from "express";
import gravatar from "gravatar";
import User from "../../models/User";

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
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      res.status(400).json({ errors: { email: "Email already exist" } });
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
router.post("/login", (req, res) => {});

export default router;
