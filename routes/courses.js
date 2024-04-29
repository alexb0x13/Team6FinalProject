const express = require('express');
const router = express.Router();
const Course = require('../models/course');

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

// Get a single course by ID
router.get('/:id', getCourse, (req, res) => {
   res.json(res.course);
 });
 
 // Update a course by ID
 router.put('/:id', getCourse, async (req, res) => {
   try {
     res.course.set(req.body);
     await res.course.save();
     res.json(res.course);
   } catch (error) {
     res.status(400).json({ message: error.message });
   }
 });
 
 // Delete a course by ID
 router.delete('/:id', getCourse, async (req, res) => {
   try {
     await res.course.remove();
     res.json({ message: 'Course deleted' });
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
 });
 
 // Middleware to get course by ID
 async function getCourse(req, res, next) {
   try {
     const course = await Course.findById(req.params.id);
     if (course === null) {
       return res.status(404).json({ message: 'Course not found' });
     }
     res.course = course;
     next();
   } catch (error) {
     return res.status(500).json({ message: error.message });
   }
 }

module.exports = router;