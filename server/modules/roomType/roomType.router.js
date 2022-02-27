const router = require('express').Router();
const isAuth = require('../../common/middleware/isAuth');
const RoomTypeController = require('./roomType.controller');

router.get('/', RoomTypeController.getAllRoomTypes);
router.get('/:roomTypeId', RoomTypeController.getRoomType);
router.post('/',isAuth, RoomTypeController.createRoomType);
router.put('/:roomTypeId', RoomTypeController.updateRoomType);
router.delete('/:roomTypeId', RoomTypeController.deleteRoomType);

module.exports = router;