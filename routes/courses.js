const Joi = require("joi");
const { Course, validate } = require("../models/Course");
const { Author } = require("../models/Author");

const auth = require("../middleware/auth");
const asyncMiddleware = require("../middleware/async");
const admin = require("../middleware/admin");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  console.log("coming...");
  res.setHeader("Access-Control-Allow-Origin", "Allow");
  const { error } = validate(req.body);
  // if(!req.body.customerId) return res.status(400).send("customerId not prodided")
  // if(!req.body.movieId) return res.status(400).send("movieId not prodided")

  // if(error){
  //     res.status(400).send(error)
  //     return;
  // }
  const author = new Author({
    name: "john",
    age: 12,
    website: "www.asd.com",
  });

  const authors = [
    new Author({
      name: "amit",
      age: 11,
      website: "www.abc.com",
    }),
    new Author({
      name: "sumit",
      age: 13,
      website: "www.asd.com",
    }),
    new Author({
      name: "kamlesh",
      age: 15,
      website: "www.sfg.com",
    }),
  ];

  const course = new Course({
    name: req.body.name,
    author: req.body.authorId,
    authorEmbeded: author,
    authors,
  });

  const result = await course.save();
  res.status(200).send(result);
});

router.put("/addAuthor/:id", async (req, res) => {
  const courseId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(courseId))
    return res.status(400).send("Course id is not valid");

  const author = new Author({
    name: "new author",
    age: 34,
    website: "www.asd.com",
  });
  const course = await Course.findById(courseId);
  course.authors.push(author);
  const result = await course.save();
  res.send(result);
});

router.delete(
  "/removeAuthor/:courseId/:authorId",
  [auth, admin],
  async (req, res) => {
    const courseId = req.params.courseId;
    const authorId = req.params.authorId;

    if (!mongoose.Types.ObjectId.isValid(courseId))
      return res.status(400).send("Course id is not valid");

    if (!mongoose.Types.ObjectId.isValid(authorId))
      return res.status(400).send("Author id is not valid");

    const course = await Course.lookup(courseId);
    const author = course.authors.id(authorId);
    try {
      await author.remove();
      const result = await course.save();
      res.send(result);
    } catch (ex) {
      res.status(500).send("Data not found");
      return;
    }
  }
);

router.get("/getCourses", auth, async (req, res, next) => {
  console.log("getCourses..");
  // const courses = await Course.find().select('name author')
  // const courses = await Course.find().populate('author').select('name author')

  const courses = await Course.find().select("name author");
  console.log("Could not get course list..", courses);
  res.send(courses);
});

router.put("/:id", async (req, res) => {
  // const result = await Course.findByIdAndUpdate(req.params.id,{name: req.body.name},{ new:true })

  //Update inside embeded schema inside course
  //const course = await Course.findById(req.params.id)
  //course.authorEmbeded.name = req.body.authorName
  //const result = course.save()

  //Secound way
  // const course = await Course.update({_id: req.params.id}, {
  //     $set : {
  //         'authorEmbeded.name' : req.body.authorName
  //     }
  // })

  // Delete the embededAuthor from this course document
  const course = await Course.update(
    { _id: req.params.id },
    {
      $unset: {
        authorEmbeded: "",
      },
    }
  );

  res.send(course);
});

router.delete("/:id", async (req, res) => {
  let result = await Course.findByIdAndRemove(req.params.id);
  res.send(result);
});

module.exports = router;
