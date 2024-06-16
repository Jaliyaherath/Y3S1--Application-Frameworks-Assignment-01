const { Room,Resource } = require('../models/roomsresourseModels');
const Timetable = require('../models/timetableModels');
const booking = require('../models/bookingModel');



class RoomController {
    // Add a new room
    async addRoom(id, name, capacity) {
        const room = new Room({ id, name, capacity });
        await room.save();
    }

    // Add a new resource
    async addResource(id, name, quantity) {
        const resource = new Resource({ id, name, quantity });
        await resource.save();
    }

    // Get all rooms
    async getAllRooms() {
        return await Room.find();
    }

    // Get all resources
    async getAllResources() {
        return await Resource.find();
    }

    // Check if a room is available
    async isRoomAvailable(roomId, date) {
        const timetable = await Timetable.findOne({location: roomId, date: date});
        return !timetable;
    }

    // Check if a resource is available
    async isResourceAvailable(resourceId, date) {
        const timetable = await Timetable.findOne({course: resourceId, date: date});
        return !timetable;
    }
}

module.exports = RoomController;