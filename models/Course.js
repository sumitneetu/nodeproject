const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const mongoose = require('mongoose')
const winston = require('winston')
const { AuthorSchema } = require('./Author')

const CoursesSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
        minlength:2,
        maxlength:40
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    authorEmbeded : AuthorSchema,
    authors : [AuthorSchema],
})

// for static methods
CoursesSchema.statics.lookup = function(courseId) {
    return this.findOne({courseId})
}
//Instance methods
CoursesSchema.methods.return = function(courseId) {
    return this.findOne({courseId})
}

const Course = mongoose.model('Course' , CoursesSchema)




function validateCourse(course) {
    const schema = Joi.object({ 
        name: Joi.string() .min(3) .required(),
        authorId : Joi.objectId().required(),
        });
    const validation = schema.validate(course);
    return validation;
}

module.exports.Course = Course;
module.exports.validate = validateCourse;