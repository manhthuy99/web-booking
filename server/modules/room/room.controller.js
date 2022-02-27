const RoomModel = require('./room');

const getAllRoom = async(req, res) => {
    const dataRoom = await RoomModel.find();

    res.send({
        success: 1,
        data: dataRoom
    })
}
module.exports = {
    getAllRoom
}