const Joi = require('joi')
const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
        minlength:2,
        maxlength:40
    },
    age : Number,
    website : String
})

const Author = mongoose.model('Author' , AuthorSchema)

function validateAuthor(author) {
    const schema = Joi.object({ 
        name: Joi.string() .min(3) .required(),
        age : Joi.number(),
        website: Joi.string()
    });
    const validation = schema.validate(author);
    return validation;
}

module.exports.AuthorSchema = AuthorSchema;
module.exports.Author = Author;
module.exports.validate = validateAuthor;