import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import AuthLayout from '../../components/layout/AuthLayout';
import request from '../../api/request';
import useAuth from '../../hooks/useAuth';


const Login = () => {
    const [status, setStatus] = useState('idle');
    const isLoading = status === 'loading';
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const { setUser } = useAuth();
    const onSubmit = async (data) => {
        const { username, password } = data;
        try {
            setStatus('loading')
            const res = await request({
                method: 'POST',
                url: '/auth/login',
                data: {
                    username,
                    password,
                }
            })
            if (res.success ) {
                setStatus('done');
                console.log(res.data.role);
                const { token, username, _id } = res.data;
                localStorage.setItem('token', token);
                setUser({
                    username, 
                    _id,
                });
                message.success('Đăng nhập thành công');
                navigate('/');
            }
        } catch (err) {
            setStatus('error');
            message.error('Đăng nhập thất bại');
        }
    }
    return (
        <AuthLayout backgroundUrl = 'https://e4life.vn/wp-content/uploads/2021/09/tu-vung-ielts-chu-de-travel.png'>
            <div style={{
                width: '500px',
                border: '1px solid gray',
                borderRadius: '15px',
                padding: '30px 30px',
                backgroundColor: 'white'
            }}>
                <h1>Login</h1>
                <Form
                    form={form}
                    onFinish={onSubmit}
                    name="basic"
                    layout="vertical"
                    initialValues={{ username: 'manhthuy', password: 'manhthuy99' }}
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
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={isLoading}>
                            Submit
                        </Button>
                    </Form.Item>
                    <Form.Item noStyle>
                        <Link to="/register" >Not have acc? Register</Link>
                    </Form.Item>
                </Form>
            </div>

        </AuthLayout>
    )
}

export default Login