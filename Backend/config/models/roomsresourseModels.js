const mongoose = require('mongoose');

// Room model
const RoomSchema = new mongoose.Schema({
    id: String,
    name: String,
    capacity: Number
});

const Room = mongoose.model('Room', RoomSchema);

// Resource model
const ResourceSchema = new mongoose.Schema({
    id: String,
    name: String,
    quantity: Number
});

const Resource = mongoose.model('Resource', ResourceSchema);

module.exports = {
    Room,
    Resource,
};