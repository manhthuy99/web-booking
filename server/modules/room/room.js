const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
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
    roomTypeId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'RoomType'
    }
})
const RoomModel = mongoose.model('Room', RoomSchema);

module.exports = RoomModel;