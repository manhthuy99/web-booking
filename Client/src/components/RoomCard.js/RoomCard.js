import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RiRuler2Line } from 'react-icons/ri';
import { IoBedOutline } from 'react-icons/io5';
import { BsPeople } from 'react-icons/bs';
import { AiOutlineWifi } from 'react-icons/ai';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import { MdSmokeFree } from 'react-icons/md';
import './RoomCard.css';
import RoomDetail from '../RoomDetail/RoomDetail';

const RoomCard = ({ roomType, imgFixed, price, originalPrice, guest, size, bed, amount, roomTypeId }) => {
  console.log(roomTypeId)
  const { hotelId } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <div className='RoomCard'>
      <h1>{roomType}</h1>
      <div className='container'>
        <div className='left'>
          <img src={imgFixed} alt={roomType} />
          <div className='info-left'>
            <h3><RiRuler2Line />{size} m2</h3>
          </div>
          <Button className='btn' onClick={showModal}>Xem chi tiết phòng</Button>
          <Modal
            width={1000}
            title={roomType}
            visible={isModalVisible}
            onOk={handleOk}
            okText='Thêm lựa chọn phòng'
            cancelButtonProps={{ disabled: true }}
            >
            <RoomDetail roomTypeId={roomTypeId} />
          </Modal>
        </div>
        <div className='right'>
          <div className='box-top'>
            <div>
              <h2>{roomType}</h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '500', fontSize: '14px' }}>
              <div><IoBedOutline /> {bed} </div>
              <div><BsPeople /> {guest} khách </div>
              <div>Số phòng còn trống ({amount})</div>
            </div>
            <div className='border-bottom' style={{ borderBottom: '1px solid #bec8c8', paddingTop: '12px' }}></div>
          </div>
          <div className='box-bottom'>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: '500',
              color: 'rgb(11, 193, 117)',
              fontSize: '14px',
              marginTop: '20px'
            }}>
              <div>
                <div style={{ color: 'rgba(104,113,118,1.00)' }}><GiForkKnifeSpoon /> Không gồm bữa sáng </div>
                <div><AiOutlineWifi /> WiFi miễn phí </div>
                <div><MdSmokeFree /> Không hút thuốc</div>
              </div>
              <div>
                <div>Miễn phí trả phòng</div>
                <div>Áp dụng chính sách đổi lịch</div>
              </div>
              <div>
                <div style={{ textDecorationLine: 'line-through', color: 'rgba(104,113,118,1.00)', fontSize: '12px' }}>{originalPrice}</div>
                <div style={{ color: 'rgb(255, 94, 31)', fontSize: '22px' }}>{price}</div>
                <div style={{ color: 'rgba(104,113,118,1.00)', fontWeight: '0', fontSize: '12px', paddingBottom: '12px' }}>/ phòng / đêm</div>
                <div>
                  <Button type='primary ' style={{ marginRight: '10px' }}>
                    <Link to = {`/order/${roomTypeId}`}>Đặt ngay</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomCard