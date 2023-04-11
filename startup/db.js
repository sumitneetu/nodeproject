const mongoose = require("mongoose");
const winston = require("winston");
module.exports = function (app) {
  mongoose
    .connect("mongodb://127.0.0.1:27017/TestProject", {
      useUnifiedTopology: true,
    })
    .then(() => {
      winston.info("Connection with database successfully.");
    })
    .catch((err) => winston.error("Connection failed with database."));
};
