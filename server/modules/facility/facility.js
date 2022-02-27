const mongoose = require('mongoose');

const FacilitySchema = new mongoose.Schema({
    nameFacility: {
        type: String,
        required: true
    }
});

const FacilityModel = mongoose.model('Facility', FacilitySchema);

module.exports = FacilityModel;