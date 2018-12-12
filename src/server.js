import express from "express";

const app = express();

app.get("/", (req, res) => res.send("Hello!"));

const PORT = process.env.PORT || 5000; // TODO: port from HEROKU
app.listen(PORT, () => {
  console.log(`Server now running on PORT: ${PORT}`);
});
