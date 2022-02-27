const router = require('express').Router();
const FacilityController = require('./facility.controller');
const isAuth = require('../../common/middleware/isAuth');

router.get('/', FacilityController.getAllFacilities);
router.post('/',isAuth, FacilityController.createFacility);
router.put('/:facilityId',isAuth, FacilityController.updateFacility);
router.delete('/:facilityId',isAuth, FacilityController.deleteFacility);

module.exports = router;