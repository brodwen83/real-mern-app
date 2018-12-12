import express from "express";
const router = express.Router();

/**
 *  @route        GET api/posts/test
 *  @description  Test post route
 *  @access       Public
 */
router.get("/test", (req, res) => res.json({ message: "User's Posts" }));

export default router;
