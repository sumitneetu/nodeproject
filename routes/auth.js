const Joi = require("joi");
const config = require("config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joiP = require("joi-password-complexity");
const _ = require("lodash");
const { User } = require("../models/User");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  console.log("user data");
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email and password.");
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("password is invalid.");
  const token = user.generateAuthToken();
  const resData = { token, expireIn: 300, email: user.email, name: user.name };
  res.send(resData);
});

function validateUser(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(256).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  const validation = schema.validate(req);
  return validation;
}

module.exports = router;
