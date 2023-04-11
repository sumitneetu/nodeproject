
const express = require('express')
const winston = require('winston')
const app = express();
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
require('./startup/logging')()
require('./startup/validation')()
require('./startup/routes')(app) 
require('./startup/db')() 
require('./startup/config')()
require('./startup/prod')(app)


const port  = process.env.PORT || 5000
var server = app.listen(port, ()=>{
    var host = server.address().address;
  var port = server.address().port;
    winston.info(`listening... on port ${port}`)
})
const typeDef = `
    type Query {
        greeting : String
    }
`

module.exports = server



// const helmet = require('helmet')
// const morgan = require('morgan')
// const startupDebugger = require('debug')('app:startapp')
// const dbDebugger = require('debug')('app:db')


// const p = Promise.reject(new Error('Something failed miserably'))
// p.then(() =>console.log("done"));

//throw new Error('Something failed during startup....')






// mongoose.connect("mongodb://localhost:27017/TestProject", { useNewUrlParser: true }).then(() => {
//     startupDebugger("Connection with playground database successfully.")
//     const objectId = mongoose.Types.ObjectId()
//     startupDebugger("Object Id")
//     startupDebugger(objectId.getTimestamp())
//     const isValid = mongoose.Types.ObjectId.isValid('2323')
//     startupDebugger(isValid)
// }).catch(err => startupDebugger("Not conncted mongo db"))



// const coursesSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         minlength : 4,
//         maxlength : 256,
//        // match : /pattern/
//     },
//     category : {
//         type: String,
//         enum :["web",'javascript','network'],
//         lowercase:true,
//         trim : true
//     },
//     author: String,
//     tags: { // custom validator
//         type : Array,
//         validate : {
//             validator : function(v) {
//                 return v && v.length > 0
//             },
//             message : 'Tage shoul have atleast one value'
//         }
//     },
//     colors: { // async validator
//         isAsync : true,
//         type : Array,
//         validate : {
//             validator : function(v, callback) {
//                 //Do some async work here
//                 setTimeout(() => {
//                     const result = v && v.length > 0
//                     return result
//                 },4000)
                
//             },
//             message : 'Color shoul have atleast one value'
//         }
//     },
//     date: {type: Date , default: Date.now},
//     isPublished : Boolean,
//     price : {
//         type: Number,
//         required: function() { return this.isPublished },
//         min : 10,
//         max: 100,
//         get: v => Math.round(v),
//         set: v => Math.round(v)
//     }
// })

// const Course = mongoose.model('Course' , coursesSchema)

//Mongoos operator
/*
eq: equal
neq : not equal
gt : greater then
lt : less then
lte : less then or equal to
in : in 
nin : not in
*/

/*
Object: 60bb1bad28a151efb8747363

const objectId = mongoos.Types.ObjectId()

ite unique object id:

12 bytes

    4 bytes: timestamp
    3 bytes : machine identifier
    2 bytes : process identifier
    3 bytes : counter

1 byte = 8 bit

Driver -> MongoDB (Id generate by mongoDB)

*/


// We can also use regular operation of find query
// async function createCourse() {
//     const course = new Course({
//         name: 'Angular js Course',
//         author: 'Manikant Tyagi',
//         tags: ['javascript'], 
//         colors: ['ss'],
//         isPublished:true,
//         price :23.23,
//         category : "Web"
//     })
//     try {
//         const result = await course.save()
//         // course.validate((err)=>{
//         //         if(err){
//         //             console.log(err.message)
//         //         }
//         // })
//         console.log(result)

//     } catch (err) {
//         console.log(err.message)
//     }
    
// }


// async function getCourses() {
//     const courses = await Course
//     .find({author : 'sumit'})
//     .or([{author : 'sumit'},{isPublished : true}])
//     .limit(2)
//     .sort({name:1})
//     .select({name:1,tags:1});
//     console.log(courses)
// }

// async function updateCourse(id) {

    //First way to update document

    //Get updated data by this query
    // const result = await Course.update(
    //     {_id : id }, 
    //     {$set : {
    //         author : 'amit',
    //         isPublished : true
    //     }},{new: true}
    // )

    // const course = await Course.findById(id)
    // if(!course) return;
    
    // //One aproch to update
    // course.author = "neetu"
    // course.isPublished = true
    //const result = await course.save()
    
    //Secound way  to update
    // const result = course.set({
    //     author : 'amit',
    //     isPublished : true
    // })


    // Aproch query first
    // findById
    // Modify It property
    //save()

    // Aproch Update fist
    //Update properly

//}

// async function removeCourse(id) {
//    // Course.deleteOne({_id: id}) // Delete first 
//    const result= await Course.deleteOne({_id: id})
//    //console.log(result)
//   // const result= Course.deleteMany({_id: id})
//    //console.log(result)
//    //const result= await Course.findByIdAndDelete(id)
//    console.log('result')
//    console.log(result)

// }

 


//Templating in the node js

// app.set('view engine' , 'pug')
// app.set('views','./views')


//Setting the envoirmant
// process.env.NODE_ENV;
// console.log(`Envoirment:: ${process.env.NODE_ENV}`)
// console.log(`Envoirment:: ${app.get('env')}`)

//Get configuration 

// console.log(`name of the the env ${config.get('name')}`)
// console.log(`name of the mail server ${config.get('mail.host')}`)
//console.log(`name of the password ${config.get('mail.password')}`)

// if(app.get('env')=='development'){
//     app.use(morgan('tiny'))
//     startupDebugger("enable morgan...")
// }

//Db dubugger
// startupDebugger("startup debugger...")
// dbDebugger("Database debuger...")


//Middleware of express



// app.use((req , res, next)=>{
//     console.log("authrncation...")
//     next();
// })



// app.get()
// app.post()
// app.put()
// app.delete()
// export -PORT=5000






// const objectId = mongoose.Types.ObjectId()
    // startupDebugger("Object Id")
    // startupDebugger(objectId.getTimestamp())
    // const isValid = mongoose.Types.ObjectId.isValid('2323')
    // startupDebugger(isValid)