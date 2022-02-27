import { Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import request from '../../api/request';
import FormOrder from '../../components/FormOrder/FormOrder';
import MainLayout from '../../components/layout/MainLayout';
import OrderCard from '../../components/OrderCard';


const Order = () => {
    const { roomTypeId } = useParams();
    const [room, setRoom] = useState({});
    const [nameHotel, setNameHotel] = useState();
    const fetchRoomById = async () => {
        try {
            const res = await request({
                method: 'GET',
                url: `/roomType/${roomTypeId}`
            })
            console.log(res.data)
            if (res.success) {
                setRoom(res.data)
                setNameHotel(res.data.hotelId.nameHotel);
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchRoomById(roomTypeId);
    }, [roomTypeId])
    return (
        <MainLayout>
            <Row justify='center'>
                <Col md={{ span: 17 }} style={{marginTop: '50px'}}>
                    <h1>Đặt phòng khách sạn</h1>
                    <h3>Điền thông tin người liên lạc và khách bên dưới</h3>
                </Col>
            </Row>
            <Row justify='center'>
                <Col md={{ span: 12 }}>
                    <FormOrder />
                </Col>
                <Col md={{ span: 5 }}>
                    <OrderCard 
                        roomType={room.roomType}
                        bed = {room.bed}
                        guest = {room.guest}
                        imgFixed = {room.imgFixed}
                        nameHotel = {nameHotel}
                        price= {room.price}
                    />
                </Col>
            </Row>
        </MainLayout>
    )
}

export default Order