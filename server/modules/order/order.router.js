const router = require('express').Router();
const OrderController = require('./order.controller');

router.get('/', OrderController.getALlOrder);

module.exports = router;