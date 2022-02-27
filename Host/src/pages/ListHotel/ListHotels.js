import React, { useEffect, useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Form, Input, Button, Col, Row } from 'antd';
import HotelCard from '../../components/HotelCard';
import request from '../../api/request';

const ListHotels = () => {
  const [listHotels, setListHotels] = useState([]);
  const fetchListHotel = async () => {
    try {
      const res = await request({
        method: 'GET',
        url: '/hotel'
      })
      if (res.success) {
        setListHotels(res.data.data)
      }
      else {
        console.log('Something went wrong');
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchListHotel();
  }, [])
  return (
    <MainLayout>
      <Form style={{ marginTop: '30px' }}>
        <Row justify='center' gutter={16}>
          <Col md={{ span: 16 }}>
            <Form.Item label="Search">
              <Input />
            </Form.Item>
          </Col>
          <Button type='primary'> Search </Button>
        </Row>
      </Form>
      <Row justify='center' gutter={16}>
        <Col md={{ span: 16 }}>
          {
            listHotels.map((value) => {
              return (
                <HotelCard
                  key={value._id}
                  imgFixed={value.imgFixed}
                  imgUrl={value.imgUrl}
                  nameHotel={value.nameHotel}
                  price={value.price}
                  originalPrice={value.originalPrice}
                  address={value.address}
                  city={value.city}
                  ratingStar={value.ratingStar}
                  hotelId={value._id}
                />
              )
            })
          }
        </Col>

      </Row>
    </MainLayout>
  )
}

export default ListHotels