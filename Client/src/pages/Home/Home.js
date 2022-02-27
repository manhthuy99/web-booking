import React from 'react';
import { Row, Col } from 'antd';
import MainLayout from '../../components/layout/MainLayout';
import FormSearchHotel from '../../components/FormSearchHotel/FormSearchHotel';
import './Home.css';

const Home = () => {
  return (
    <MainLayout>
      <div className='container'>
        <div className='slide'>
          <img src='https://toptravel.vn/uploads/slide%20top-travel-h%C3%A8-2021.jpg' alt='slide' />
        </div>
        <Row justify='center'>
          <Col md={{ span: 16 }}>
            <div className='SearchBox'>
              <FormSearchHotel />
            </div>
          </Col>
        </Row>
      </div>
    </MainLayout>
  )
}

export default Home