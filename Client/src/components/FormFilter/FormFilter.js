import { Form, Checkbox, Collapse, Button, Rate, Slider, InputNumber, Row, Col } from 'antd'
import React, { useState } from 'react';

const { Panel } = Collapse;

export const FormFilter = () => {
    const [form] = Form.useForm();
    const [inputValue, setInputValue] = useState(0);
    const onChange = value => {
        setInputValue(value);
      };
    return (
        <div className='FormFilter'>
            <Form form={form}>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="Sắp xếp kết quả theo lựa chọn" key="1">
                        <Form.Item name="sort">
                            <Checkbox.Group>
                                <Checkbox style={{ marginLeft: '8px' }} value='HIGHEST_PRICE'> Giá cao nhất </Checkbox>
                                <Checkbox value='LOWEST_PRICE'> Giá thấp nhất </Checkbox>
                                <Checkbox value='USER_RATING'> Điểm đánh giá </Checkbox>
                                <Checkbox value='POPULARITY'> Độ phổ biến </Checkbox>
                            </Checkbox.Group>
                        </Form.Item>
                    </Panel>
                </Collapse>
                <Collapse>
                    <Panel header="Hạng sao" key="2">
                        <Form.Item>
                            <Form.Item name="ratingStar">
                                <Checkbox.Group>
                                    <Checkbox value='1' style={{ marginLeft: '8px' }}> <Rate defaultValue={1} disabled /> </Checkbox>
                                    <Checkbox value='2'> <Rate defaultValue={2} disabled /></Checkbox>
                                    <Checkbox value='3'><Rate defaultValue={3} disabled /> </Checkbox>
                                    <Checkbox value='4'> <Rate defaultValue={4} disabled /> </Checkbox>
                                    <Checkbox value='5'> <Rate defaultValue={5} disabled /> </Checkbox>
                                </Checkbox.Group>
                            </Form.Item>
                        </Form.Item>
                    </Panel>
                </Collapse>
                <Collapse>
                    <Panel header="Khoảng giá/đêm" key="3">
                        <Row>
                            <Col span={12}>
                                <Slider
                                    min={1}
                                    max={20}
                                    onChange={onChange}
                                    value={typeof inputValue === 'number' ? inputValue : 0}
                                />
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    min={1}
                                    max={20}
                                    style={{ margin: '0 16px' }}
                                    value={inputValue}
                                    onChange={onChange}
                                />
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>
                <Button type="primary" htmlType="submit">Search</Button>
            </Form>
        </div>
    )
}
