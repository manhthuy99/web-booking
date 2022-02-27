import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Carousel, Row, Col, Rate, Button, Modal } from 'antd';
import { GrLocation } from 'react-icons/gr';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import MainLayout from '../../components/layout/MainLayout';
import request from '../../api/request';
import './hoteldetail.css';
import ListFacilites from '../../components/ListFacilites';
import ListRoom from '../../components/ListRoom';
import Review from '../../components/Review';
// import Slider from '../../components/Carousel/Slider';

const HotelDetail = () => {
    const { hotelId } = useParams();
    const [hotel, setHotel] = useState({});
    const [listImg, setListImg] = useState([]);
    const fetchDetailHotel = async (hotelId) => {
        try {
            const res = await request({
                method: 'GET',
                url: `/hotel/${hotelId}`
            })
            console.log(res.data.ratingStar)
            if (res.success) {
                setHotel(res.data)
                setListImg(res.data.imgUrl)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchDetailHotel(hotelId)
    }, [hotelId])
    return (
        <MainLayout>
            <Row justify='center'>
                <Col md={{ span: 16 }}>
                    <div className='HotelDetail'>
                        <Row>
                            <Col md={{ span: 24 }}>
                                <div className='title'>
                                    <h1>{hotel.nameHotel}</h1>
                                    <h3 style={{ color: 'rgba(104,113,118,1.00)' }}>{hotel.nameHotel}</h3>
                                    <div className='rate'>
                                        <p>Khách sạn</p>
                                        <Rate disabled defaultValue={hotel.ratingStar} />
                                    </div>
                                    <p className='address'><GrLocation />{hotel.address},{hotel.city}</p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 24 }}>
                                <Carousel autoplay>
                                    {listImg.map((value, i) => {
                                        return (<div key={i}>
                                            <img src={value} alt="example" style={{ width: '100%', height: '400px', borderRadius: '10px' }} />
                                        </div>)
                                    })}
                                </Carousel>
                            </Col>
                        </Row>
                        <div style={{ borderBottom: '1px solid gray' }}>
                            <Row>
                                <Col md={{ span: 16 }}>
                                    <div className='rate-count' style={{ alignItem: 'right' }}>
                                        <h1> Traveloka </h1>
                                        <p><BsFillBookmarkCheckFill /> 8,8 Ấn tượng </p>
                                        <span> đánh giá từ 182 khách hàng </span>
                                    </div>
                                </Col>
                                <Col md={{ span: 8 }}>
                                    <div className='price'>
                                        <p>Giá phòng mỗi đêm từ</p>
                                        <h1>{hotel.price}</h1>
                                        <Button> Đặt ngay </Button>
                                        <Modal title="Delete">
                                            <p>Bạn có muốn xóa không</p>
                                        </Modal>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <Row>
                            <Col span={24}>
                                <h2>Tiện nghi khách sạn </h2>
                                <ListFacilites />
                                <h3 style={{ textAlign: 'center', paddingTop: '20px', fontWeight: 'bold', color: 'rgba(2,100,200,1.00)' }}> XEM TẤT CẢ TIỆN NGHI</h3>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col span={24}>
                            <ListRoom hotelId={hotelId} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{span: 24}}>
                            <Review />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </MainLayout>
    )
}

export default HotelDetail