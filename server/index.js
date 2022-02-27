require('dotenv').config();
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');
const AuthRouter = require('./modules/auth');
const UploadRouter = require('./modules/upload');
const HotelRouter = require('./modules/hotel');
const RoomTypeRouter = require('./modules/roomType');
const FacilityRouter = require('./modules/facility');
const CartRouter = require('./modules/cart');
const OrderRouter = require('./modules/order');
const RoomRouter = require('./modules/room');
const TicketPlaneRouter = require('./modules/ticketPlane');
const ReviewRouter = require('./modules/review');
const errorHandler = require('./common/errorHandler');

async function main() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connect');
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use('/uploads', express.static('uploads'));

    app.use('/api/auth', AuthRouter);
    app.use('/api/upload', UploadRouter);
    app.use('/api/hotel', HotelRouter);
    app.use('/api/roomType', RoomTypeRouter);
    app.use('/api/facility', FacilityRouter);
    app.use('/api/cart', CartRouter);
    app.use('/api/order', OrderRouter);
    app.use('/api/room', RoomRouter);
    app.use('/api/ticketPlane', TicketPlaneRouter);
    app.use('/api/review', ReviewRouter);
    app.get('/api/location', (req, res) => {
        res.sendFile(__dirname + '/modules/location/location.json');
    })
    
    app.use(errorHandler);

    app.listen(9000 || process.env.PORT, (err) => {
        if(err) throw err;
        
        console.log("Server started")
    })
}

main();
