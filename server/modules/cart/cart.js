const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    rooms: [
        {
            room: {
                type: mongoose.Types.ObjectId,
                ref: 'Room'
            },
        }],
    
        totalPrice: Number,
    
        createdBy: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User'
        }
})

const CartModel = mongoose.model('Cart', CartSchema);

module.exports = CartModel;