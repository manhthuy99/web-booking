const mongoose = require('mongoose');

const RoomTypeSchema = new mongoose.Schema({
    roomType: {
        type: String,
        required: true
    },
    imgFixed: {
        type: String,
        required: true
    },
    imgUrl: [
        { type: String, required: true}
    ],
    guest: {
        type: String,
        required: true
    },
    originalPrice: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    bed: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    facilities: [
        {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Facility'
        }
    ],
    size: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    hotelId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Hotel'
    }
},{
    timestamps: true,
});

const RoomTypeModel = mongoose.model('RoomType', RoomTypeSchema);

module.exports = RoomTypeModel;