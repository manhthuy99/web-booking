const TicketPlaneModel = require('./ticketPlane');

const getAllTicketPlane =  async (req, res) => {
    const data = await TicketPlaneModel.find();

    res.send({
        success: 1,
        data: data
    })
}

const getTicketPlane = async(req, res) => {
    const { ticketId } = req.params;
    const getTicketPlane = await TicketPlaneModel.findById(ticketId);

    res.send({
        success: 1,
        data: getTicketPlane
    })
}

const createTicket = async (req, res) => {
    const { user } = req;
    const newTicketData = req.body;

    if (user.role !== 'Host') {
        throw new HttpError('You cannot create a hotel', 401);
    }
    const newTicket = await TicketPlaneModel.create({
        ...newTicketData,
        createdBy: user._id,
    });

    res.send({
        success: 1,
        data: newTicket,
    });
};

const updateTicket = async (req, res) => {
    const { ticketId } = req.params;
    const { user } = req;

    const updatedTicketData = req.body;

    if (user.role !== 'Host') {
        throw new HttpError('You cannot update a hotel', 401);
    }

    const updateTicket = await TicketPlaneModel.findByIdAndUpdate(
        { _id: ticketId, createdBy: user._id },
        updatedTicketData,
        { new: true }
    );

    res.send({
        success: 1,
        data: updateTicket,
    });
};
const deleteTicket = async (req, res) => {
    const { ticketId } = req.params;
    const { user } = req;

    if (user.role !== 'Host') {
        throw new HttpError('You cannot delete a hotel', 401);
    }

    const deleteTicket = await TicketPlaneModel.findByIdAndDelete({
        _id: ticketId,
        createdBy: user._id,
    });

    res.send({
        success: 1,
        data: deleteTicket,
    });
};
module.exports ={
    getAllTicketPlane,
    getTicketPlane, 
    createTicket, 
    updateTicket,
    deleteTicket
}