const Course = require("../models/course");
const router = require("express").Router();

// Get list of all courses in the database
router.get("/", function(req, res) {
   Course.find(function(err, courses) {
      if (err) {
         res.status(400).send(err);
      } 
      else {
         res.json(courses);
      }
   });
});

// Add a new course to the database
router.post("/", function(req, res) {
   const course = new Course(req.body);
   course.save(function(err, course) {
      if (err) {
         res.status(400).send(err);
      } 
      else {
         res.status(201).json(course);
      }
   });
});

module.exports = router;