import express from "express";
const router = express.Router();

/**
 *  @route        GET api/users/test
 *  @description  Test post route
 *  @access       Public
 */
router.get("/test", (req, res) => res.json({ message: "Users Works" }));

export default router;
