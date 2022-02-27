import React from 'react';
import { Row, Col } from 'antd';
import { FaHotel } from 'react-icons/fa';
import { AiOutlineWifi } from 'react-icons/ai';
import { GiForkKnifeSpoon } from 'react-icons/gi';

const OrderCard = ({ roomType, bed, guest, nameHotel, imgFixed, price }) => {
    const date = new Date();
    return (
        <div style={{ marginTop: '50px', padding: '15px 15px', background: '#fff', borderRadius: '10px' }}>
            <Row>
                <Col spand={24}>
                    <div style={{ display: 'flex' }}>
                        <FaHotel style={{ fontSize: '40px', paddingTop: '5px', marginRight: '10px' }} />
                        <div style={{ lineHeight: '1' }}>
                            <h2>{nameHotel}</h2>
                            <h3 style={{ color: 'gray' }}>{nameHotel}</h3>
                        </div>
                    </div>
                    <div style={{ borderTop: '1px solid gray', marginTop: '15px' }}>
                        <div style={{ display: 'flex', paddingTop: '15px' }}>
                            <p style={{ fontWeight: '500', color: 'gray', paddingRight: '8px' }}>Ngày nhận phòng: </p>
                            <b>{date.toLocaleDateString('en-GB')}, Từ 14:00</b>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <p style={{ fontWeight: '500', color: 'gray', paddingRight: '8px' }}>Ngày trả phòng: </p>
                            <b>{date.toLocaleDateString('en-GB')}, Trước 12:00</b>
                        </div>
                    </div>
                    <div style={{ borderTop: '1px solid gray', marginTop: '15px', paddingTop: '15px' }}>
                        <h2>(1x) {roomType}</h2>
                        <div style={{ display: 'flex' }}>
                            <p style={{ color: 'gray', fontWeight: '500', marginRight: '60px' }}>Khách/phòng</p>
                            <b>{guest} khách</b>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <p style={{ color: 'gray', fontWeight: '500', marginRight: '60px' }}>Kiểu giường</p>
                            <b>{bed}</b>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', lineHeight: '1' }}>
                            <img src={imgFixed} alt='order' style={{ width: '80px', height: '80px', borderRadius: '5px', marginRight: '50px' }} />
                            <div style={{ paddingLeft: '10px' }}>
                                <div style={{ display: 'flex', fontWeight: '500', color: 'gray' }}>
                                    <GiForkKnifeSpoon style={{ fontSize: '30px' }} />
                                    <p>Không bao gồm bữa sáng</p>
                                </div>
                                <div style={{ display: 'flex', fontWeight: '500', color: 'rgb(11, 193, 117)' }}>
                                    <AiOutlineWifi />
                                    <p>WiFi</p>
                                </div>
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            borderTop: '1px solid gray',
                            marginTop: '15px',
                            paddingTop: '15px'
                        }}>
                            <p style={{fontWeight: '500', color: 'gray'}}>Thành tiền</p>
                            <h2>{price} VND</h2>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>


    )
}

export default OrderCard