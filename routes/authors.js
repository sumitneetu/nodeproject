const Joi = require('joi')
const { Author , validate } = require('../models/Author')
const express = require('express')
const router = express.Router()



router.post('/' , async (req, res)=>{
    const { error } = validate(req.body)
    if(error){
        res.status(400).send(error)
        return;
    }
    const author = new Author({
        name: req.body.name,
        age : req.body.age,
        website : req.body.website
    })
    const result = await author.save()
    res.send(result) 
})

router.get('/getAuthors' , async (req, res)=>{
    const authors = await Author.find().sort('name')
    res.send(authors)
})

router.put('/:id' , async (req, res)=>{
    const result = await Author.findByIdAndUpdate(req.params.id,{name: req.body.name},{ new:true })
    res.send(result)
})

router.delete('/:id' , async (req, res)=>{
    let result = await Author.findByIdAndRemove(req.params.id)
    res.send(result)
})



module.exports = router;
