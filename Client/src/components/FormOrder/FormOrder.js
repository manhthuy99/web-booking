import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';

const FormOrder = () => {
    const [form] = Form.useForm();
    return (
        <Row gutter={16}>
            <Col span={22}>
                <div style={{ marginTop: '50px', backgroundColor: "#fff", padding: '15px 15px', borderRadius: '10px' }}>
                    <Form form={form} layout='vertical'>
                        <h2>Thông tin của bạn</h2>
                        <Form.Item
                            label="Tên người liên hệ:"
                            name="username"
                            rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}>
                            <Input />
                        </Form.Item>
                        <Row gutter={12}>
                            <Col span={12}>
                                <Form.Item
                                    label="Số di động:"
                                    name="telephone"
                                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Email:"
                                    name="email"
                                    rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            label="Địa chỉ:"
                            name="address"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ của bạn!' }]}>
                            <Input />
                        </Form.Item>
                        <h2>Thẻ thanh toán</h2>
                        <Form.Item
                            label="Số thẻ tín dụng:"
                            name="credit"
                            rules={[{ required: true, message: 'Vui lòng nhập số thẻ tín dụng của bạn!' }]}>
                            <Input />
                        </Form.Item>
                        <Row gutter={12}>
                            <Col span={12}>
                                <Form.Item
                                    label="Hiệu lực đến:"
                                    name="effect"
                                    rules={[{ required: true, message: 'Vui lòng nhập hiệu lực đến!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="CVV:"
                                    name="cvv"
                                    rules={[{ required: true, message: 'Vui lòng nhập CVV của bạn!' }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            label="Tên trên thẻ:"
                            name="nameCredit"
                            rules={[{ required: true, message: 'Vui lòng nhập tên trên thẻ của bạn!' }]}>
                            <Input />
                        </Form.Item>
                        <Row justify='center'>
                            <Button style={{
                                background: '#F96D01',
                                height: '55px',
                                fontSize: '16px',
                                outLine: 'none',
                                border: 'none',
                                marginTop: '30px',
                                fontWeight: '500'
                            }} htmlType='submit' type='primary'> Thanh toán đặt phòng </Button>
                        </Row>

                    </Form>
                </div>
            </Col>
        </Row>
    )
}

export default FormOrder