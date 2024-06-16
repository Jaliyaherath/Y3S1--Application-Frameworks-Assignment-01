const express = require('express');
const timetableController = require('../controllers/timetableCtrl');

const router = express.Router();


// Route for CRUD operations on timetable
router.get('/', timetableController.getAllTimetables);
router.get('/:id', timetableController.getTimetableById);
router.post('/', timetableController.createTimetable);
router.put('/:id', timetableController.updateTimetable);
router.delete('/:id', timetableController.deleteTimetable);

//Route for Operations on courses in a timetable
router.post('/:id/courses', timetableController.addCourseToTimetable);
router.put('/:id/courses', timetableController.updateCourseInTimetable);
router.delete('/:id/courses', timetableController.deleteCourseFromTimetable);

module.exports = router;