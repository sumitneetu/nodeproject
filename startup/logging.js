const winston = require('winston')
require('express-async-errors')
require('winston-mongodb')

//const { createLogger, format, transports } = require('winston');
module.exports = function () {
    
    winston.createLogger(
        new winston.transports.Console({colorize: true, prettyPrint : true}),
        new winston.transports.File({filename: 'uncaughtException.log'})
        )
    // process.on('uncaughtException', (ex) => {
    //     console.log("WE GOT UNCAUGHT EXCEPTION.")
    //     winston.error(ex.message, ex)
    //     process.exit(1)
    // })

    process.on('unhandledRejection', (ex) => {
        // console.log("WE GOT UNHANDLED PROMIS REJECTION.")
        // winston.error(ex.message , ex)
        throw ex;
       // process.exit(1)
    })

    winston.add(new winston.transports.File({
        filename: 'logfile.log'
    }));
    
    winston.add(new winston.transports.MongoDB({
        db: 'mongodb://localhost:27017/TestProject',
        level : 'info'
    }));
}






// winston will automaticly cought the unhandl promise rejection


