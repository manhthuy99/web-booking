const FacilityModel = require('./facility');
const HttpError = require('../../common/httpError');

const getAllFacilities = async (req, res) => {
    const getAllData = await FacilityModel.find();

    res.send({
        success: 1,
        data: getAllData
    })
}

const createFacility = async (req, res) => {
    const { nameFacility } = req.body;
    const { user } = req;

    // if(user.role !== 'Admin') {
    //     throw new HttpError('You cannot create a facility');
    // }

    const newFacility = await FacilityModel.create({ nameFacility });

    res.send({
        success: 1,
        data: {
            nameFacility: newFacility.nameFacility
        }
    })
}

const updateFacility = async (req, res) => {
    const { facilityId } = req.params;
    const dataUpdate = req.body;
    const { user } = req;

    if(user.role !== 'Admin') {
        throw new HttpError('You cannot update a facility');
    }

    const updateFacility = await FacilityModel.findOneAndUpdate({_id: facilityId}, dataUpdate, { new : true});

    res.send({
        success: 1,
        data: updateFacility
    })
};

const deleteFacility = async (req, res) => {
    const { facilityId } = req.params;
    const { user } = req;

    if(user.role !== 'Admin') {
        throw new HttpError('You cannot update a facility');
    }

    const deleteFacility = await FacilityModel.findOneAndDelete({_id: facilityId});

    res.send({
        success: 1,
        data: deleteFacility
    })
}
module.exports = {
    getAllFacilities,
    createFacility, 
    updateFacility,
    deleteFacility
}