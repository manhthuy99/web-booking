import { Row, Col, Carousel } from 'antd';
import React, { useEffect, useState } from 'react';
import request from '../../api/request';
import { RiRuler2Line } from 'react-icons/ri';
import { BsPeople, BsWind } from 'react-icons/bs';
import { BiFridge } from 'react-icons/bi';

const RoomDetail = ({ roomTypeId }) => {
    const [room, setRoom] = useState({});
    const [listImg, setListImg] = useState([]);

    const fetchDetailRoom = async () => {
        const res = await request({
            method: 'GET',
            url: `/roomType/${roomTypeId}`
        })
        console.log(res);
        if (res.success) {
            setRoom(res.data);
            setListImg(res.data.imgUrl)
        }
    }
    useEffect(() => {
        fetchDetailRoom(roomTypeId)
    }, [roomTypeId]);
    return (
        <div>
            <Row>
                <Col span={18}>
                    <div style={{ borderRight: '1px solid gray', paddingRight: '20px' }}>
                        <Carousel autoplay>
                            {listImg.map((value, i) => {
                                return (<div key={i}>
                                    <img src={value} alt="example" style={{ width: '100%', height: '400px', borderRadius: '10px' }} />
                                </div>)
                            })}
                        </Carousel>
                    </div>
                </Col>
                <Col span={6}>
                    <div style={{ marginLeft: '20px' }}>
                        <div style={{ borderBottom: '1px solid gray' }}>
                            <h3>Thông tin phòng</h3>
                            <h4><RiRuler2Line /> {room.size} m2</h4>
                            <h4><BsPeople /> {room.guest} khách </h4>
                        </div>
                        <div style={{ borderBottom: '1px solid gray', marginTop: '10px' }}>
                            <h3>Tính năng phòng bạn thích</h3>
                            <h4><BiFridge /> Tủ lạnh </h4>
                            <h4><BsWind /> Máy lạnh</h4>
                        </div>
                        <div style={{ borderBottom: '1px solid gray', marginTop: '10px' }}>
                            <h3>Tiện nghi phòng</h3>
                            <ul style={{ fontWeight: '500', marginLeft: '-20px' }}>
                                <li>Quầy bar mini</li>
                                <li>Nước đóng chai miễn phí</li>
                                <li>TV</li>
                                <li>Bàn làm việc</li>
                                <li>Két an toàn tại phòng</li>
                            </ul>
                        </div>
                        <div style={{ borderBottom: '1px solid gray', marginTop: '10px' }}>
                            <h3>Khởi điểm từ :</h3>
                            <div >
                                <h2 style={{ color: 'rgb(255, 94, 31)' }}>{room.price} VND</h2>
                                <p>/phòng/đêm</p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default RoomDetail