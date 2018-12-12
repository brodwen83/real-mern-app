import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import users from "./routes/api/users";
import profile from "./routes/api/profile";
import posts from "./routes/api/posts";

const passport = require("passport");

dotenv.config();

const app = express();

/**
 * @description body-parser middleware
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

// Passport Middleware
app.use(passport.initialize());
// Passport Config
require("./config/passport")(passport);

/**
 * @description Routes handlers
 */
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
