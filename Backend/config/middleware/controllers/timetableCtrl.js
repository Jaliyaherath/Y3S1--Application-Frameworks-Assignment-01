const Timetable = require('../models/timetableModels');
const Course = require('../models/courseModels.Js');

const timetableController = {
  //Method to get all timetables
  getAllTimetables: async (req, res) => {
    try {
      const timetables = await Timetable.find();
      res.json(timetables);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  //Method to get a timetable by ID
  getTimetableById: async (req, res) => {
    try {
      const timetable = await Timetable.findById(req.params.id);
      if (timetable == null) {
        return res.status(404).json({ message: 'Cannot find timetable' });
      }
      res.json(timetable);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  //Create a new timetable
  createTimetable: async (req, res) => {
    const { course, time, faculty, location } = req.body;
    const timetable = new Timetable({
      course,
      time,
      faculty,
      location
    });
  
    try {
      const newTimetable = await timetable.save();
      res.status(201).json(newTimetable);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  //Update a timetable
  updateTimetable: async (req, res) => {
    try {
      const timetable = await Timetable.findById(req.params.id);
      if (timetable == null) {
        return res.status(404).json({ message: 'Cannot find timetable' });
      }
  
      // Update the timetable fields here
      const { course, time, faculty, location } = req.body;
      timetable.course = course;
      timetable.time = time;
      timetable.faculty = faculty;
      timetable.location = location;
  
      const updatedTimetable = await timetable.save();
      res.json(updatedTimetable);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  //Delete a timetable
  deleteTimetable: async (req, res) => {
    try {
      const result = await Timetable.deleteOne({ _id: req.params.id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Cannot find timetable' });
      }
      res.json({ message: 'Deleted timetable' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  //Method to add a course to a timetable
  addCourseToTimetable: async (req, res) => {
    try{
      const timetable = await Timetable.findById(req.params.id);
      return res.status(404).json({ message: 'Cannot find timetable' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
    const { code, day, startTime, endTime } = req.body;
     // Check if the course already exists in the timetable
     const existingCourse = timetable.courses.find(course => course.code === code);
     if (existingCourse) {
       return res.status(400).json({ message: 'Course already exists in the timetable' });
     }
 
     // Create a new course object
     const newCourse = {
       code,
       day,
       startTime,
       endTime
     };
 
     // Add the new course to the timetable
     timetable.courses.push(newCourse);
     const updatedTimetable = await timetable.save();
    res.json(updatedTimetable);
  },
  //Method to update a course in a timetable
  updateCourseInTimetable: async (req, res) => {
    try {
      const timetable = await Timetable.findById(req.params.id);
      if (timetable == null) {
        return res.status(404).json({ message: 'Cannot find timetable' });
      }
  
      const { code, day, startTime, endTime } = req.body;
  
      // Find the index of the course in the timetable
      const courseIndex = timetable.courses.findIndex(course => course.code === code);
      if (courseIndex === -1) {
        return res.status(404).json({ message: 'Cannot find course in the timetable' });
      }
  
      // Update the course fields
      timetable.courses[courseIndex].day = day;
      timetable.courses[courseIndex].startTime = startTime;
      timetable.courses[courseIndex].endTime = endTime;
  
      const updatedTimetable = await timetable.save();
      res.json(updatedTimetable);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  //Method to delete a course from a timetable
  deleteCourseFromTimetable: async (req, res) => {
    try {
      const timetable = await Timetable.findById(req.params.id);
      if (timetable == null) {
        return res.status(404).json({ message: 'Cannot find timetable' });
      }
  
      const { code } = req.body;
  
      // Find the index of the course in the timetable
      const courseIndex = timetable.courses.findIndex(course => course.code === code);
      if (courseIndex === -1) {
        return res.status(404).json({ message: 'Cannot find course in the timetable' });
      }
  
      // Remove the course from the timetable
      timetable.courses.splice(courseIndex, 1);
  
      const updatedTimetable = await timetable.save();
      res.json(updatedTimetable);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

};



module.exports = timetableController;