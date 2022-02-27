const HotelModel = require('./hotel');
const RoomTypeModel = require('../roomType/roomType');
const HttpError = require('../../common/httpError');

const getAllHotel = async (req, res) => {
    const {
        keyword,
        createdBy,
        skip,
        limit,
        sortDirection,
        sortField,
    } = req.query;

    const createdByFilter = createdBy ? { createdBy } : {};
    const keywordFilter = keyword ? { city: { $regex: new RegExp(`${keyword}`, 'i') } } : {};

    const filter = {
        ...keywordFilter,
        ...createdByFilter,
    };

    const pagination = {
        skip: skip ? Number(skip) : 0,
        limit: limit ? Number(limit) : 5,
    };

    const sortDirectionParams = sortDirection ? Number(sortDirection) : -1;

    const sortParams = sortField ? { [sortField]: sortDirectionParams } : {};

    const [hotels, totalHotels] = await Promise.all([
        HotelModel.find(filter)
            .populate('createdBy')
            .populate('facilities')
            .sort(sortParams)
            .skip(pagination.skip)
            .limit(pagination.limit),
        HotelModel.find(filter).countDocuments(),
    ]);

    res.send({
        success: 1,
        data: {
            data: hotels,
            total: totalHotels
        }
    });
};

const getHotel = async (req, res) => {
    const { hotelId } = req.params;

    const foundHotel = await HotelModel.findById(hotelId);

    res.send({
        success: 1,
        data: foundHotel,
    });
};

const createHotel = async (req, res) => {
    const { user } = req;
    const newHotelData = req.body;

    if (user.role !== 'Host') {
        throw new HttpError('You cannot create a hotel', 401);
    }
    const newHotel = await HotelModel.create({
        ...newHotelData,
        createdBy: user._id,
    });

    res.send({
        success: 1,
        data: newHotel,
    });
};

const updateHotel = async (req, res) => {
    const { hotelId } = req.params;
    const { user } = req;

    const updatedHotelData = req.body;

    if (user.role !== 'Host') {
        throw new HttpError('You cannot update a hotel', 401);
    }

    const updateHotel = await HotelModel.findByIdAndUpdate(
        { _id: hotelId, createdBy: user._id },
        updatedHotelData,
        { new: true }
    );

    res.send({
        success: 1,
        data: updateHotel,
    });
};

const deleteHotel = async (req, res) => {
    const { hotelId } = req.params;
    const { user } = req;

    if (user.role !== 'Host') {
        throw new HttpError('You cannot delete a hotel', 401);
    }

    const deleteHotel = await HotelModel.findByIdAndDelete({
        _id: hotelId,
        createdBy: user._id,
    });

    res.send({
        success: 1,
        data: deleteHotel,
    });
};

const getRoomTypeByHotel = async (req, res) => {
    const { hotelId } = req.params;

    const RoomTypes = await RoomTypeModel.find({ hotelId });

    res.send({
        success: 1,
        data: RoomTypes,
    });
};
module.exports = {
    getAllHotel,
    getHotel,
    createHotel,
    updateHotel,
    deleteHotel,
    getRoomTypeByHotel,
};
