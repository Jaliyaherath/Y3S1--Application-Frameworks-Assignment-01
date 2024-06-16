const express = require('express');
const RoomController = require('../controllers/roomCtrl');

const router = express.Router();

const roomController = new RoomController();

//Route for Rooms and Resourses

// Add a new room
router.post('/rooms', async (req, res) => {
    const { id, name, capacity } = req.body;
    await roomController.addRoom(id, name, capacity);
    res.status(201).json({ message: 'Room added successfully' });
});

// Add a new resource
router.post('/resources', async (req, res) => {
    const { id, name, quantity } = req.body;
    await roomController.addResource(id, name, quantity);
    res.status(201).json({ message: 'Resource added successfully' });
});

// Get all rooms
router.get('/rooms', async (req, res) => {
    const rooms = await roomController.getAllRooms();
    res.status(200).json(rooms);
});

// Get all resources
router.get('/resources', async (req, res) => {
    const resources = await roomController.getAllResources();
    res.status(200).json(resources);
});

// Check if a room is available
router.get('/rooms/:roomId/availability', async (req, res) => {
    const { roomId } = req.params;
    const date = req.query.date;
    const isAvailable = await roomController.isRoomAvailable(roomId, date);
    res.status(200).json({ available: isAvailable });
});

// Check if a resource is available
router.get('/resources/:resourceId/availability', async (req, res) => {
    const { resourceId } = req.params;
    const date = req.query.date;
    const isAvailable = await roomController.isResourceAvailable(resourceId, date);
    res.status(200).json({ available: isAvailable });
});

module.exports = router;





