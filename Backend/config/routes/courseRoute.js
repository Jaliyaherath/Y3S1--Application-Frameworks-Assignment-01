const express = require('express');
const courseController = require('../controllers/courseCtrl');

const router = express.Router();

// Route for CRUD operations on courses
router.get('/courses', courseController.getAllCourses);
router.get('/courses/:id', courseController.getCourseById);
router.post('/courses', courseController.createCourse);
router.put('/courses/:id', courseController.updateCourse);
router.delete('/courses/:id', courseController.deleteCourse);

module.exports = router;