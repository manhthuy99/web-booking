const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    imgUrl: [
        {
            type: String,
            required: true
        }
    ],
    imgFixed: {
        type: String,
        required: true
    },
    nameHotel: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    originalPrice: String,
    price: {
        type: String,
        required: true
    },
    ratingStar: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    city: {
        type: String,
        required: true
    },
    address: {
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
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    },{ timestamps : true}
)

const HotelModel = mongoose.model('Hotel', HotelSchema);

module.exports = HotelModel;