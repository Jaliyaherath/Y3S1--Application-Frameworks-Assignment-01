const Course = require('../models/courseModels.Js');

const courseController = {
  //Method to get all courses
  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.find();
      res.json(courses);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  //Method to get a course by ID
  getCourseById: async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (course == null) {
        return res.status(404).json({ message: 'Cannot find course' });
      }
      res.json(course);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  //Create a new course
  createCourse: async (req, res) => {
    const course = new Course({
      name: req.body.name,
      code: req.body.code,
      description: req.body.description,
      credits: req.body.credits
    });
    try {
      const newCourse = await course.save();
      res.status(201).json(newCourse);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  //Update a course
  updateCourse: async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (course == null) {
        return res.status(404).json({ message: 'Cannot find course' });
      }

      // assuming your Course model has a name field
      if (req.body.name != null) {
        course.name = req.body.name;
      }
      const updatedCourse = await course.save();
      res.json(updatedCourse);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  //Delete a course
  deleteCourse: async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (course == null) {
        return res.status(404).json({ message: 'Cannot find course' });
      }
      await Course.findByIdAndDelete(req.params.id);
      res.json({ message: 'Deleted Course' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = courseController;