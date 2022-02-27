const router = require('express').Router();
const isAuth = require('../../common/middleware/isAuth')
const TicketPlaneController = require('./ticketPlane.controller');

router.get('/', TicketPlaneController.getAllTicketPlane);
router.get('/:ticketId', TicketPlaneController.getTicketPlane);
router.post('/',isAuth,TicketPlaneController.createTicket);
router.put('/:ticketId',isAuth, TicketPlaneController.updateTicket);
router.delete('/:ticketId',isAuth, TicketPlaneController.deleteTicket);

module.exports = router;