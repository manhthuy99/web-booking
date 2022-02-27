import React from 'react';
import { Layout, Menu, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Navbar.css';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const { Header } = Layout;
  const { user, setUser } = useAuth();
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <Header>
      <div className="logo" />
      {
        !user ? (
          <Menu theme="dark" mode="horizontal" >
            <Menu.Item key='1'><Link to='/login'>Login</Link></Menu.Item>
            <Menu.Item key='2'><Link to='/register'>Register</Link></Menu.Item>
          </Menu>
        ) : (
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key='3'>
              <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
              {user.username}
            </Menu.Item>
            <Menu.Item key='4'>
              <Button onClick={logout}>Logout</Button>
            </Menu.Item>
          </Menu>
        )
      }

    </Header>
  )
}

export default Navbar