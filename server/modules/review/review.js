const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    rateCount: {
        type: Number,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

const ReviewModel = mongoose.model('Review', ReviewSchema);

module.exports = ReviewModel;