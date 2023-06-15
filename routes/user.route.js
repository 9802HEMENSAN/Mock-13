const express = require("express");
const { UserModel } = require("../Model/user.model");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

UserRouter.post("/register", async (req, res) => {
  const { email, password, avatar, name } = req.body;
  try {
    bcrypt.hash(password, 4, async (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({ email, avatar, name, password: hash });
        await user.save();
        res.send("user registerd");
      }
    });
  } catch (error) {
    res.send(error);
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userId: user._id, username: user.name}, process.env.SECRET_KEY );
          res.send({ msg: "login successfuly", token: token });
        } else {
          res.send("wrong data");
        }
      });
    } else {
      res.send("Wrong credentials");
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = {
  UserRouter,
};
