import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// MongoDB connection
mongoose
  .connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => console.log("MongoDB on MLab connected..."))
  .catch(err => console.log("Can't connect to the database", err));
/** end MongoDB connection. */

app.get("/", (req, res) => res.send("Hello!"));

const PORT = process.env.PORT || 5000; // TODO: port from HEROKU
app.listen(PORT, () => {
  console.log(`Server now running on PORT: ${PORT}`);
});
