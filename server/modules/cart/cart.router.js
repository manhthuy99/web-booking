const router = require('express').Router();
const CartController = require('./cart.controller');

router.get('/', CartController.getAllCart);
module.exports = router;