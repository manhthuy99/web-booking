import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Button, Upload, Rate, Select, message, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import { InboxOutlined } from '@ant-design/icons';
import request from '../../api/request';
import MainLayout from '../../components/layout/MainLayout';

const { Option } = Select;

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

const CreateHotel = () => {
  const [status, setStatus] = React.useState('idle');
  const [facilities, setFacilities] = useState([]);
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
  }
  const onSubmit = async (values) => {
    const { nameHotel, description, images, price, originalPrice, ratingStar, address, city, facilities } = values;
    const imgFixed = images[0].response;
    const imgUrl = images.map((imageUrl) => {
      return imageUrl.response;
    })
    try {
      setStatus('loading');
      const res = await request({
        url: '/hotel',
        method: 'POST',
        data: {
          nameHotel,
          description,
          imgFixed,
          imgUrl,
          price,
          originalPrice,
          ratingStar,
          address,
          city,
          facilities
        },
      });
      console.log(res);
      if (res.success) {
        navigate('/');
      }
    } catch (err) {
      console.log(err)
    }
  };

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

  const isLoading = status === 'loading';

  return (
    <MainLayout>
      <h1 style={{ textAlign: 'center' }}>Create Hotel </h1>
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
            <Form.Item name="nameHotel" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="originalPrice" label="Original Price" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="ratingStar" label="Rating Star" rules={[{ required: true }]}>
              <Rate defaultValue={0} />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="address" label="Address">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row justify='center' gutter={16}>
          <Col md={{ span: 12 }}>
            <Form.Item name="city" label="City" rules={[{ required: true, message: 'Missing area' }]}>
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
export default CreateHotel;