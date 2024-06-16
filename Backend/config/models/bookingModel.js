const mongoose=require('mongoose');

const bookingSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true
    },
    resourceId: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    }
});

const bookingModel = mongoose.model('booking', bookingSchema);

module.exports = bookingModel;