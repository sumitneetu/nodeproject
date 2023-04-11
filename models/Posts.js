
const mongoose = require('mongoose')
const winston = require('winston')

const PostsSchema = new mongoose.Schema({
    title : {
        type : String,
        required: true,
        minlength:2,
        maxlength:40
    },
    content : {
        type : String,
        required: true,
        minlength:2,
        maxlength:40
    }
})


const Post = mongoose.model('Post' , PostsSchema)


module.exports.Post = Post;