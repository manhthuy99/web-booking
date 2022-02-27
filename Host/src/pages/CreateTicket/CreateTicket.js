import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Button,DatePicker, Select, TimePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import request from '../../api/request';
import MainLayout from '../../components/layout/MainLayout';

const { Option } = Select;

const CreateTicket = () => {
  const [status, setStatus] = React.useState('idle');
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onSubmit = async (values) => {
    const { airlines, departureDate, guest, typeTicket, seatClass, from, to, price, timePicker } = values;

    try {
      setStatus('loading');
      const res = await request({
        url: '/ticketPlane',
        method: 'POST',
        data: {
          airlines,
          departureDate,
          guest,
          typeTicket,
          seatClass,
          from, 
          to,
          timePicker,
          price
        },
      });
      console.log(res);
      if (res.success) {
        navigate('/listTicket');
      }
    } catch (err) { 
      console.log(err)
    }
  };

  const [locations, setLocations] = useState([]);
  const fetchLocation = async () => {
    try {
      const res = await request({
        url: '/location',
        method: 'GET'
      });
      console.log(res.data)
      setLocations(res.data.data);
    } catch (err) {
      console.log(err)
    }
  }
  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  useEffect(() => {
    fetchLocation();
  }, []);

  const isLoading = status === 'loading';

  return (
    <MainLayout>
      <h1 style={{ textAlign: 'center' }}>Create Tiket Plane </h1>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Row justify='center' gutter={16}>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item label="Hãng máy bay" name="airlines">
                <Select>
                    <Option value="VietJet">VietJet</Option>
                    <Option value="VietNam Airline">VietName Airline</Option>
                    <Option value="Bamboo">Bamboo</Option>
                </Select>
            </Form.Item>
            </Col>
        </Row>
        <Row justify='center' gutter={16}>
            <Col xs={{ span: 24 }} md={{ span: 6 }}>
            <Form.Item label="Ngày đi" name="departureDate">
                <DatePicker onChange={onChange} />
            </Form.Item>
            </Col>
            <Col xs={{ span: 24}} md={{ span: 6 }}>
              <Form.Item label="Guest" name="guest">
                <Input />
              </Form.Item>
            </Col>
        </Row>
        <Row justify='center' gutter={16}>
          <Col xs={{ span: 24 }} md={{ span: 6 }}>
                <Form.Item label="Loại vé"name="typeTicket" >
                    <Select>
                        <Option value="Một Chiều">Một Chiều</Option>
                        <Option value="Khứ hồi"> Khứ hồi </Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 6 }}>
                <Form.Item label="Loại ghế" name="seatClass">
                    <Select>
                        <Option value="Thương gia">Thương gia</Option>
                        <Option value="Phổ thông">Phổ thông</Option>
                        <Option value="Phổ thông đặc biệt">Phổ thông đặc biệt</Option>
                        <Option value="Hạng nhật"> Hạng nhất </Option>
                    </Select>
                </Form.Item>
            </Col>
        </Row>
        <Row justify='center' gutter={16}>
          <Col md={{ span: 12 }}>
            <Form.Item name="price" label="Price">
              <Input />
            </Form.Item>
          </Col>
          {/* <Col md={{ span: 6 }}>
            <Form.Item name="timePicker" label="Time">
              <TimePicker.RangePicker />
            </Form.Item>
          </Col> */}
        </Row>
        <Row justify='center' gutter={16}>
          <Col md={{ span: 6 }}>
            <Form.Item name="from" label="From" rules={[{ required: true, message: 'Missing area' }]}>
              <Select>
                {locations.map((city) => {
                  return (
                    <Option key={city.code} value={city.name}>{city.name}</Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col md={{ span: 6 }}>
            <Form.Item name="to" label="To" rules={[{ required: true, message: 'Missing area' }]}>
              <Select>
                {locations.map((city) => {
                  return (
                    <Option key={city.code} value={city.name}>{city.name}</Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row justify='end'>
          <Col md={{ span: 8 }}>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Submit
              </Button>
            </Form.Item>
          </Col>

        </Row>
      </Form>
    </MainLayout>
  );
}
export default CreateTicket;