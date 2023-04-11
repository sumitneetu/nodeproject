const Joi = require("joi");
const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send("Token does not provided for authentication.");
  try {
    const decodedTken = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decodedTken;
    next();
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = auth;
