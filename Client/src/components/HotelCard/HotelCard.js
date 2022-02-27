import React from 'react';
import { Rate, Button, } from 'antd';
import { GrLocation } from 'react-icons/gr';
import {ArrowRightOutlined } from '@ant-design/icons';
import './HotelCard.css';
import { Link } from 'react-router-dom';

const HotelCard = ({ imgFixed, nameHotel, price, originalPrice, ratingStar, city, address, hotelId }) => {
  return (
    <div className='HotelCard'>
      <img className='hotel-card-img' src={imgFixed} alt={nameHotel} />
      <Link to={`/hotels/${hotelId}`}>
        <div className='content'>
          <h2>{nameHotel}</h2>
          <div className='content_rate'>
            <p>Khách sạn</p>
            <Rate disabled defaultValue={ratingStar} />
          </div>
          <p><GrLocation />{address},{city}</p>
        </div>
      </Link>
      <div className='price'>
        <p className='content-price'>Thanh toán khi nhận phòng</p>
        <span className='original-price'>{originalPrice}</span>
        <h1 className='cost'>{price} VND</h1>
        <div className='btn'>
        <Link to={`/hotels/${hotelId}`} style={{borderRight: 'none'}}>
            <Button type='primary'> Đặt ngay  </Button>
        </Link>
        </div>
      </div>
    </div>

  )
}

export default HotelCard