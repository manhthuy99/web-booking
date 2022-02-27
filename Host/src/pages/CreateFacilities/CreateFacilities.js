import React, {useState, useEffect} from 'react';
import { Button, Form, Input, Row, Col, message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import request from '../../api/request';
import MainLayout from '../../components/layout/MainLayout';

const CreateFacilities = () => {
    const [form] = Form.useForm();
    const [facilities, setFacilities] = useState([]);

    const fetchFacilites = async () => {
        try {
            const res = await request({
                method: 'GET',
                url: '/facility'
            })
            if (res.success) {
                setFacilities(res.data);
            }
            console.log(res);
        } catch (err) {
            message.error('Something went wrong')
        }

    }
    useEffect(() => {
        fetchFacilites();
    }, [])
    
    const onSubmit = async (values) => {
        const { nameFacility } = values;
        try {
            const res = await request({
                method: 'POST',
                url: '/facility',
                data: {
                    nameFacility
                }
            });
            console.log(res)
            if (res.success) {
                message.success('Success');
                setFacilities(prevFacility => {
                    const newFacility = [...prevFacility, res.data];
                    return newFacility;
                })
                form.resetFields();
            }
            else{
                message.error('Thất bại')
            }
        } catch (err) {
            message.success('Thất bại');
        }
    }
    
    return (
        <MainLayout>
            <h1 style={{textAlign: 'center'}}>Create Facility</h1>
            <Form
                form={form}
                initialValues={{}}
                autoComplete="off"
                onFinish={onSubmit}
            >
                <Row gutter={16} justify="center">
                    <Col span={10}>
                        <Form.Item
                            label="Facility"
                            name="nameFacility"
                            rules={[{ required: true, message: 'Please input facility!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Button type="primary" htmlType="submit" >
                        Submit
                    </Button>
                </Row>
            </Form>
            <div>
            {facilities.map((facility) => {
                return <div key={facility._id}><CheckOutlined />{facility.nameFacility}</div>
            })}
        </div>
            
        </MainLayout>

    )
}

export default CreateFacilities