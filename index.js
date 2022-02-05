const express = require("express");
const studentRouter = require("./router/studentRouter");
const mongoose = require("mongoose");

// connect with database

mongoose
  .connect("mongodb://localhost:27017/student-database")
  .then(() => console.log("Connected with mongoDB !"))
  .catch((err) => console.log("MongoDB connection Failed !"));

const app = express();

app.use(express.json());

app.use("/api/students", studentRouter);

app.get("/", (req, res) => {
  res.send("Express server is active !");
});

app.listen(3000, () => {
  console.log("Express Server listing... !");
});
