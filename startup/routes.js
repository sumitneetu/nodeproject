const express = require('express')
const courses = require('../routes/courses')
const posts = require('../routes/posts')
const authors = require('../routes/authors')
const users = require('../routes/users')
const auth = require('../routes/auth')
const home = require('../routes/home')

const error = require('../middleware/error')
const logger = require('../middleware/logger')

module.exports = function (app) {
    
    app.use(express.json())
    app.use(express.urlencoded({
        extended: true
    }))
    app.use(express.static("public"))
    app.use(logger)
    app.use('/api/courses', courses)
    app.use('/api/posts', posts)
    app.use('/api/authors', authors)
    app.use('/api/users', users)
    app.use('/api/auth', auth)
    app.use('/', home)
    app.use(error)
}