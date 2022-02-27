const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    email: String,
    telephone: String,
    role: {
        type: String,
        enum: ['User', 'Admin', 'Host']
    }
}, {
    timestamps: true
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;