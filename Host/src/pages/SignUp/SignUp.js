import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import AuthLayout from '../../components/layout/AuthLayout';
import request from '../../api/request';

const backgroundUrl = 
'https://expatguideturkey.com/wp-content/uploads/2020/10/which-ways-may-be-followed-in-making-long-distance-travel.jpg'
const SignUp = () => {
  const [status, setStatus] = useState('idle'); 
  const [form] = Form.useForm();
  const isLoading = status === 'loading';
 
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const { username, password } = data;
    try {
      setStatus('loading')
      const res = await request({
        method: 'POST',
        url: '/auth/signup',
        data: {
          username,
          password,
          role: 'Host'
        }
      })
      if (res.success) {
        setStatus('done');
        console.log(res.data);
        const { token } = res.data;
        localStorage.setItem('token', token);
        message.success('Đăng kí thành công');
        navigate('/login');
      }
    } catch (err) {
      setStatus('error');
      message.error('Đăng kí thất bại');
    }
  }
  return (
    <AuthLayout backgroundUrl = { backgroundUrl }>
      <div style={{
        width: '500px',
        border: '1px solid gray',
        borderRadius: '15px',
        padding: '30px 30px',
        backgroundColor: 'white'
      }}>
        <h1>Register</h1>
        <Form
          form={form}
          onFinish={onSubmit}
          name="basic"
          layout="vertical"
          initialValues={{}}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Telephone"
            name="telephone"
            rules={[{ required: true, message: 'Please input your telephone!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
          <Form.Item noStyle>
            <Link to="/login" >You are already registered? Login</Link>
          </Form.Item>
        </Form>
      </div>

    </AuthLayout>
  )
}

export default SignUp