import React, { useEffect, useState } from 'react';
import request from '../../api/request';
import RoomCard from '../RoomCard.js/RoomCard';

const ListRoom = (props) => {
    const hotelId = props.hotelId;
    const [room, setRoom] = useState([]);
    const fetchRoom = async (hotelId) => {
        try {
            const res = await request({
                method: 'GET',
                url: `/hotel/${hotelId}/roomTypes`
            })
            console.log(res.data);
            if (res.success) {
                setRoom(res.data);
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchRoom(hotelId);
    }, [hotelId]);
    return (
        <div>
            {
                room.map((value) => {
                    return <RoomCard 
                    key={value._id} 
                    roomType={value.roomType}
                    imgFixed = {value.imgFixed}
                    guest = {value.guest}
                    bed = {value.bed}
                    size = {value.size}
                    amount = {value.amount}
                    price = {value.price}
                    originalPrice = {value.originalPrice}
                    roomTypeId = {value._id} 
                    />
                })
            }
        </div>
    )
}

export default ListRoom;