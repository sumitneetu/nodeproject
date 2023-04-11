const winston = require('winston')
function error(err,req , res, next) {
    winston.error(err.message,{ message: 'world' })
    // warn
    //info
    //error
    //verbose
    //bebug
    // silly
    res.status(400).send("Something went wrong.")
}

module.exports = error