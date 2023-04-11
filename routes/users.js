const Joi = require("joi");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const joiP = require("joi-password-complexity");
const _ = require("lodash");
const auth = require("../middleware/auth");
const { User, validUser } = require("../models/User");
const express = require("express");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const token = user.generateAuthToken();
  await user.save();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
