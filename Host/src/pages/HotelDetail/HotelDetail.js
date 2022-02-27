import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Carousel, Row, Col, Rate, Button, Drawer, Modal, message } from 'antd';
import { GrLocation } from 'react-icons/gr';
import { BsFillBookmarkCheckFill } from 'react-icons/bs'
import MainLayout from '../../components/layout/MainLayout';
import request from '../../api/request';
import './hoteldetail.css';
import ListFacilites from '../../components/ListFacilites';
import ListRoom from '../../components/ListRoom';
import UpdateHotel from '../../components/UpdateHotel';
// import Slider from '../../components/Carousel/Slider';

const HotelDetail = () => {
    const { hotelId } = useParams();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState({});
    const [listImg, setListImg] = useState([]);
    const [visible, setVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        onDelete();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const onDelete = async() => {
        try{
            const res = await request({
                method: 'DELETE',
                url: `/hotel/${hotelId}`
            })
            if(res.success){
                message.success('Xóa thành công');
                navigate('/')
            }
        }catch(err) {
            console.log(err)
        }
    }
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
                                        <Button onClick={showDrawer}> Update </Button>
                                        <Drawer width={800} title="Update Hotel" placement="right" onClose={onClose} visible={visible}>
                                            <UpdateHotel hotelId={hotelId} />
                                        </Drawer>
                                        <Button onClick={showModal}> Delete</Button>
                                        <Modal title="Delete" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
                    <Button><Link to={`/hotels/${hotelId}/createRoom`}>Create Room</Link></Button>
                    <Row>
                        <Col span={24}>
                            <ListRoom hotelId={hotelId} />
                        </Col>
                    </Row>

                </Col>
            </Row>
        </MainLayout>
    )
}

export default HotelDetail