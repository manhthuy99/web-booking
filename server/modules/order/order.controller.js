const OrderModel = require('./order');

const getALlOrder = async (req, res) => {
    const dataOrder = await OrderModel.find();

    res.send({
        data: dataOrder,
        success: 1
    })
}
module.exports = {
    getALlOrder
}