const RoomTypeModel = require('./roomType');

const getAllRoomTypes = async (req, res) => {

    const dataRoomTypes = await RoomTypeModel.find();

    res.send({
        success: 1,
        data: dataRoomTypes
    })
}
const getRoomType = async (req, res) => {
    const { roomTypeId } = req.params;
    const data = await RoomTypeModel.findById(roomTypeId).populate('hotelId', 'nameHotel');
    res.send({
        success: 1,
        data: data
    })
}

const createRoomType = async (req, res) => {
    const { hotelId,
        roomType,
        guest,
        imgUrl,
        imgFixed,
        bed,
        size,
        amount,
        price,
        originalPrice,
        facilities,
        description } = req.body;
    const newRoomType = await RoomTypeModel.create({ hotelId, roomType, guest, imgUrl, imgFixed, bed, size, amount, price, originalPrice, facilities, description });

    res.send({
        success: 1,
        data: newRoomType
    })

}

const updateRoomType = async (req, res) => {
    const { roomTypeId } = req.params;
    const updateRoomTypeData = req.body;

    const updateRoomType = await RoomTypeModel.findOneAndUpdate(
        { _id: roomTypeId },
        updateRoomTypeData,
        { new: true });

    res.send({
        success: 1,
        data: updateRoomType
    })
}

const deleteRoomType = async (req, res) => {
    const { roomTypeId } = req.params;

    const deleteRoomType = await RoomTypeModel.findOneAndDelete({ _id: roomTypeId });

    res.send({
        success: 1,
        data: deleteRoomType
    })
}
module.exports = {
    getAllRoomTypes,
    getRoomType,
    createRoomType,
    updateRoomType,
    deleteRoomType
}