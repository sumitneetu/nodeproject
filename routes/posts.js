const Joi = require('joi')
const { Post  } = require('../models/Posts')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()



router.post('/addPost' , async (req, res)=>{
    //const { error } = validate(req.body)
    console.log("coming in the api::")
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
    })
    const result = await post.save()
    res.status(200).send(result) 
})

router.get('/getPosts' , async (req, res, next)=>{
    console.log("getPost..")
    throw new Error('some error coming')
    const posts = await Post.find().select('title content')
    console.log('Could not get course list..', posts)
    res.send(posts)

})


module.exports = router;
