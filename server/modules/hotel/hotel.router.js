const router = require('express').Router();
const HotelController = require('./hotel.controller');
const isAuth = require('../../common/middleware/isAuth');

router.get('/', HotelController.getAllHotel);
router.get('/:hotelId', HotelController.getHotel);
router.post('/',isAuth, HotelController.createHotel);
router.put('/:hotelId',isAuth, HotelController.updateHotel);
router.delete('/:hotelId',isAuth, HotelController.deleteHotel);
router.get('/:hotelId/roomTypes', HotelController.getRoomTypeByHotel);

module.exports = router;