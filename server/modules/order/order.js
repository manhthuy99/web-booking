const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    roomTypeId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'RoomType'
    },
    orderStatus: {
        type: String,
        default: 'Processing',
        enum: ["Processing", "Success", "Cancel"]
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    paymentIntent: {},

    totalPrice: Number,

    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
});

const OrderModel = mongoose.model('Order', OrderSchema);

module.exports = OrderModel;