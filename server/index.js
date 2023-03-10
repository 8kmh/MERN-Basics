const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const dotenv = require("dotenv");
dotenv.config();

const port = 3000;

const cors = require("cors");
app.use(express.json());
app.use(cors());
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);

app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
