const Joi = require("joi");
const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 256,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 256,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 1024,
  },
  isAdmin: Boolean,
  roles: [],
  operations: [],
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    config.get("jwtPrivateKey"),
    { expiresIn: "5M" }
  );
  return token;
};

const User = mongoose.model("User", UserSchema);

function validateUser(user) {
  //winston.info("validating course",{ creditCard: 123456789012345 })
  const schema = Joi.object({
    name: Joi.string().min(5).max(256).required(),
    email: Joi.string().min(5).max(256).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  const validation = schema.validate(user);
  return validation;
}

module.exports.UserSchema = UserSchema;
module.exports.User = User;
module.exports.validUser = validateUser;
