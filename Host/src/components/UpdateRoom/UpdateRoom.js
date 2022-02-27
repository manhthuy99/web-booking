import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Button, Upload, message, Checkbox } from 'antd';
import { useParams } from 'react-router-dom';
import { InboxOutlined } from '@ant-design/icons';
import request from '../../api/request';

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const customRequest = ({ file, onError, onSuccess }) => {
    const formData = new FormData();
    formData.append('file', file);

    request
        .post('/upload', formData)
        .then(({ data: response }) => {
            onSuccess(response, file);
        })
        .catch(onError);

    return {
        abort() {
            console.log('upload progress is aborted.');
        },
    };
};

const UpdateRoom = ({ roomTypeId }) => {
    // const [status, setStatus] = React.useState('idle');
    const [facilities, setFacilities] = useState([]);
    const { hotelId } = useParams();
    const [form] = Form.useForm();

    function onChange(checkedValues) {
        console.log('checked = ', checkedValues);
    }
    const onSubmit = async (values) => {
        const {
            roomType,
            description,
            price,
            originalPrice,
            guest,
            size,
            amount,
            bed,
            facilities
        } = values;
        // const imgFixed = images[0].response;
        // const imgUrl = images.map((imageUrl) => {
        //     return imageUrl.response;
        // })
        try {
            // setStatus('loading');
            const res = await request({
                url: `/roomType/${roomTypeId}`,
                method: 'PUT',
                data: {
                    roomType,
                    description,
                    price,
                    originalPrice,
                    size,
                    amount,
                    bed,
                    guest,
                    facilities,
                    hotelId
                },
            });
            console.log(res);
            if (res.success) {
                message.success('Cập nhật thành công');
            }
            else{
                message.error('Cập nhật thất bại');
            }
        } catch (err) {
            console.log(err)
        }
    };

    const fetchFacilities = async () => {
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
        fetchFacilities();
    }, [])

    // const isLoading = status === 'loading';

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Update Room </h1>
            <Form form={form} layout="vertical" onFinish={onSubmit}>
                <Row gutter={16} justify="center">
                    <Col xs={{ span: 24 }} md={{ span: 12 }}>
                        <Form.Item label="Images">
                            <Form.Item
                                name="images"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                noStyle
                            >
                                <Upload.Dragger name="files" customRequest={customRequest}>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">
                                        Click or drag file to this area to upload
                                    </p>
                                    <p className="ant-upload-hint">
                                        Support for a single or bulk upload.
                                    </p>
                                </Upload.Dragger>
                            </Form.Item>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify='center' gutter={16}>
                    <Col xs={{ span: 24 }} md={{ span: 12 }}>
                        <Form.Item name="roomType" label="Room Type">
                            <Input />
                        </Form.Item>
                        <Form.Item name="originalPrice" label="Original Price">
                            <Input />
                        </Form.Item>
                        <Form.Item name="price" label="Price">
                            <Input />
                        </Form.Item>
                        <Form.Item name="guest" label="Guest">
                            <Input />
                        </Form.Item>
                        <Form.Item name="bed" label="Bed">
                            <Input />
                        </Form.Item>
                        <Form.Item name="size" label="Size Room">
                            <Input />
                        </Form.Item>
                        <Form.Item name="amount" label="Number of Rooms">
                            <Input />
                        </Form.Item>
                        <Form.Item name="description" label="Description">
                            <Input.TextArea />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify='center' gutter={16}>
                    <Col md={{ span: 12 }}>
                        <Form.Item name='facilities' label="Facilities">
                            <Checkbox.Group onChange={onChange} style={{ width: '100%' }}>
                                {
                                    facilities.map((value) => {
                                        return <><Checkbox key={value._id} value={value._id}>{value.nameFacility}</Checkbox></>
                                    })
                                }
                            </Checkbox.Group>
                        </Form.Item>
                    </Col>

                </Row>
                <Row justify='end'>
                    <Col md={{ span: 8 }}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        </div>
    );
}
export default UpdateRoom;