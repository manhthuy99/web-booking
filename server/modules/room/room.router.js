const router = require('express').Router();
const RoomController = require('./room.controller');

router.get('/', RoomController.getAllRoom);
module.exports = router;