const express = require('express');
const bookingController = require('../controllers/bookingCtrl');


const router = express.Router();

//Routes for CRUD operation booking
router.post('/', bookingController.createBooking);
router.get('/', bookingController.getAllBookings);
router.put('/:id', bookingController.updateBooking);
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;