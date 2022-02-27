const CartModel = require('./cart');

const getAllCart = async (req, res) => {
    const data = await CartModel.find();
    res.send({
        data: data,
        success: 1
    })
}
module.exports = {
    getAllCart
}