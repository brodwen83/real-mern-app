import express from "express";
const router = express.Router();

/**
 *  @route        GET api/profile/test
 *  @description  Test post route
 *  @access       Public
 */
router.get("/test", (req, res) => res.json({ message: "Users Profile" }));

export default router;
