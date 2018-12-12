import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import users from "./routes/api/users";
import profile from "./routes/api/profile";
import posts from "./routes/api/posts";

dotenv.config();

const app = express();

/**
 * @description MongoDB connection
 */
mongoose
  .connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => console.log("MongoDB on MLab connected..."))
  .catch(err => console.log("Can't connect to the database", err));
/** end MongoDB connection. */

/**
 * @description Routes handlers
 */
app.get("/", (req, res) => res.send("Hello!"));
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
/** end routes handlers. */

/**
 * @description Listen to a PORT
 */
const PORT = process.env.PORT || 5000; // TODO: port from HEROKU
app.listen(PORT, () => {
  console.log(`Server now running on PORT: ${PORT}`);
});
