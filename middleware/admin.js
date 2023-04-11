const Joi = require('joi')
const mongoose = require('mongoose')
const config = require('config')
const jwt = require('jsonwebtoken')

function admin(req , res, next) {
    if(!req.user.isAdmin) return res.status(403).send("Forbidden user")
    next();
}

module.exports = admin