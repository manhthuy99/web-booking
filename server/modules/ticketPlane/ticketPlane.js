const mongoose = require('mongoose');

const TicketPlaneSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    departureDate: {
        type: Date,
        required: true
    },
    seatClass: {
        type: String,
        required: true
    },
    guest: {
        type: Number,
        required: true
    },
    typeTicket: {
        type: String,
        required: true
    },
    airlines: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    timePiker: {
        type: Date
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref:'User'
    }
})
const TicketPlaneModel = mongoose.model('TicketPlane', TicketPlaneSchema);

module.exports = TicketPlaneModel;