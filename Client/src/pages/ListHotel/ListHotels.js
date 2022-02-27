import React, { useEffect, useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Col, Row } from 'antd';
import { useSearchParams } from 'react-router-dom';
import HotelCard from '../../components/HotelCard';
import request from '../../api/request';
import { FormFilter } from '../../components/FormFilter/FormFilter';

const ListHotels = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [listHotels, setListHotels] = useState([]);

  let keyword = searchParams.get('city');
  console.log(keyword)
  const fetchListHotel = async () => {
    try {
      const res = await request({
        method: 'GET',
        url: `/hotel`,
        params: { keyword }
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
      <div style={{marginTop: '30px'}}>
        <Row justify='center' gutter={16}>
          <Col md={{ span: 5 }}>
            <FormFilter />
          </Col>
          <Col md={{ span: 12 }}>
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
      </div>

    </MainLayout>
  )
}

export default ListHotels