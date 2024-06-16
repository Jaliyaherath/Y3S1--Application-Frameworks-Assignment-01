const Booking = require('../models/bookingModel');
const RoomController = require('../controllers/roomCtrl');

const roomController = new RoomController();

const createBooking = async (req, res) => {
    const newBooking = new Booking(req.body);
    const roomId = req.body.roomId;
    const resourceId = req.body.resourceId;
    const startTime = new Date(req.body.startTime);
    const endTime = new Date(req.body.endTime);

    // Validate room ID
    const rooms = await roomController.getAllRooms();
    if (!rooms.find(room => room.id === roomId)) {
        return res.status(400).json('Invalid room ID.');
    }

    // Check if the room and resource are available
    const roomAvailable = await roomController.isRoomAvailable(roomId, startTime);
    if (!roomAvailable) {
        return res.status(400).json('Room is not available.');
    }

    const resourceAvailable = await roomController.isResourceAvailable(resourceId, startTime);
    if (!resourceAvailable) {
        return res.status(400).json('Resource is not available.');
    }

    // Check for overlapping bookings
    const existingBooking = await Booking.findOne({
        roomId: roomId,
        resourceId: resourceId,
        startTime: { $lt: endTime },// Check if the new booking starts before the existing booking ends
        endTime: { $gt: startTime } // Check if the new booking ends after the existing booking starts
    });

    if (existingBooking) {
        return res.status(400).json('There have another session.');
    }

    // Save the booking
    newBooking.save()
        .then(() => res.json('Booking added!'))
        .catch(err => res.status(400).json('Error: ' + err));
};

const updateBooking = async (req, res) => {
    const bookingId = req.params.id;
    const updatedBooking = req.body;
    const roomId = updatedBooking.roomId;
    const resourceId = updatedBooking.resourceId;
    const startTime = new Date(updatedBooking.startTime);
    const endTime = new Date(updatedBooking.endTime);

    // Validate room ID
    const rooms = await roomController.getAllRooms();
    if (!rooms.find(room => room.id === roomId)) {
        return res.status(400).json('Invalid room ID.');
    }

    // Check if the room and resource are available
    const roomAvailable = await roomController.isRoomAvailable(roomId, startTime);
    if (!roomAvailable) {
        return res.status(400).json('Room is not available.');
    }

    const resourceAvailable = await roomController.isResourceAvailable(resourceId, startTime);
    if (!resourceAvailable) {
        return res.status(400).json('Resource is not available.');
    }

    // Check for overlapping bookings
    const existingBooking = await Booking.findOne({
        _id: { $ne: bookingId },
        roomId: roomId,
        resourceId: resourceId,
        startTime: { $lt: endTime },
        endTime: { $gt: startTime }
    });

    if (existingBooking) {
        return res.status(400).json('There have another session..');
    }

    // Update the booking
    Booking.findByIdAndUpdate(bookingId, updatedBooking)
        .then(() => res.json('Booking updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
};


const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
};


const deleteBooking = (req, res) => {
    const bookingId = req.params.id;

    Booking.findByIdAndDelete(bookingId)
        .then(() => res.json('Booking deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
};

module.exports = {
    createBooking,
    updateBooking,
    deleteBooking,
    getAllBookings
};

