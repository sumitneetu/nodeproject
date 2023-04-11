// api/course/ POST: {}

const request = require('supertest')
const {
    models
} = require('mongoose');
const mongoose = require('mongoose')
const {
    User
} = require('../../models/User')
// return 401 if client is not logedin
// return 400 if course name not provided
const {
    Author
} = require('../../models/Author')
const {
    Course
} = require('../../models/Course');
const {
    expectCt
} = require('helmet');

describe('api/course', () => {
    let server;
    let courses;
    let courseId = new mongoose.Types.ObjectId();
    let authorId1 = new mongoose.Types.ObjectId();
    let authorId2 = new mongoose.Types.ObjectId();
    let authorId3 = new mongoose.Types.ObjectId();
    let customerId;
    let name;
    let movieId;
    let token;
    const exec =  () => {
        return  request(server).post('/api/courses').set('x-auth-token', token).send({courses,name});
    }
    beforeEach(async () => {
        server = require('../../index')
        token = new User().generateAuthToken()
        customerId = new mongoose.Types.ObjectId();
        movieId = new mongoose.Types.ObjectId();
        name = 'new course';
        const author = new Author({
            _id: authorId3,
            name: 'john',
            age: 12,
            website: 'www.asd.com'
        })

        const authors = [new Author({
            _id: authorId1,
            name: 'amit',
            age: 11,
            website: 'www.abc.com'
        }), new Author({
            _id: authorId2,
            name: 'sumit',
            age: 13,
            website: 'www.asd.com'
        })]
        courses = new Course({
            _id: courseId,
            name: "sumit",
            author: authorId2,
            authorEmbeded: author,
            authors
        })

        await courses.save()

    })
    afterEach(async () => {
        await server.close()
        await Course.remove({})
    })

    it('It should work' , async () =>{
        const result = await Course.findById(courses._id);
       
        expect(result).not.toBeNull()
    })

    // it('It should return 401 if client is not logged in' , async () =>{
    //     token=''
    //     const res = await exec();
    //    expect(res.status).toBe(401)

    // })
    // it('customer id not provided' , async () =>{
    //     customerId=''
    //     const res = await exec();
    //     expect(res.status).toBe(400)

    // })

    // it('customer id not provided' , async () =>{
    //     movieId=''
    //     const res = await exec();
    //     expect(res.status).toBe(400)

    // })

    // it('If course not provided proide 400 error', async () => {
    //     await Course.remove();
    //     const res = await exec();
    //     expect(res.status).toBe(404)

    // })

    it('should return 200 if valid request', async () => {
        
        const res = await exec();
         expect(res.status).toBe(200)

    })

    it('should set the return data if input is valid', async () => {
        const res = await exec();
        const result = await Course.findById(courses._id);
        expect(result.name).toBeDefined()

      //  const diff = new Date() -  result.date
       // expect(diff).toBeLessThen(10 * 1000)
        //expect(result.date).toBeDefined()
    })
    it('check the response', async () => {
        const res = await exec();
        const result = await Course.findById(courses._id);
      //  expect(res.body).toMatchObject(result)
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('authors')
      //  const diff = new Date() -  result.date
       // expect(diff).toBeLessThen(10 * 1000)
        //expect(result.date).toBeDefined()

        expect(Object.keys(res.body)).toEqual(expect.arrayContaining(['name','authors']))
    })
})