import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Form, Select, DatePicker, InputNumber, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import request from '../../api/request';
import './FormSearchHotel.css';

const { Option } = Select;
const { RangePicker } = DatePicker;
const FormSearchHotel = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);
    const handleSubmit = (values) => {
        const { city } = values;
        navigate(`/hotels?city=${city}`)
    }

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
    useEffect(() => {
        fetchLocation();
    }, []);
    return (
        <Form
            form={form}
            onFinish={handleSubmit}
        >
            <div className='form-search-hotel'>
                <div className="search-city">
                    <div>
                        <SearchOutlined style={{ fontSize: '25px', paddingTop: '20px' }} />
                    </div>
                    <Form.Item name="city" rules={[{ required: true, message: 'Missing area' }]}>
                        <Select placeholder="Enter a destination">
                            {locations.map((city) => {
                                return (
                                    <Option key={city.code} value={city.name}>{city.name}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                </div>
                <div className='form-bottom'>
                    <div className='form-date'>
                        <Form.Item name="date">
                            <RangePicker />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item name='guest'>
                            <InputNumber />
                        </Form.Item>
                    </div>
                </div>
                <Row justify='center'>
                    <Button style={{
                        marginTop: '20px', 
                        width: '200px', 
                        height: '50px', 
                        borderRadius: '7px',
                        fontSize: '22px', 
                        background: 'rgb(83, 146, 249)', 
                        outline: 'none'
                    }} type='primary' htmlType='submit'>Search</Button>
                </Row>
            </div>
        </Form>

    )
}

export default FormSearchHotel