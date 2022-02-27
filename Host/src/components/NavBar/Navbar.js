import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
  PlusCircleOutlined,
  CheckOutlined,
  ProfileOutlined,
  RocketOutlined
} from '@ant-design/icons';
import './Navbar.css';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import SubMenu from 'antd/lib/menu/SubMenu';


const Navbar = () => {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const { user, setUser } = useAuth();
  const onCollapse = (collapsed) => {
    console.log(collapsed)
    setCollapsed(collapsed);
  };
  const onClick = () => {
    setUser(null);
    localStorage.removeItem('token');
  }

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu theme="dark" mode='inline'>
        <Menu.Item key='1' icon={<UserOutlined />}>
          <Link to='/'>
            Welcome {user.username}
          </Link>
        </Menu.Item>
        <Menu.Item key='7' icon={<UserOutlined />}>
          <Link to='/listUser'>
            ListUser
          </Link>
        </Menu.Item>
        <SubMenu title="Ticket Plane" key='sub2' icon={<RocketOutlined />}>
          <Menu.Item key="9" icon={<PlusCircleOutlined />}>
          <Link to='/createTicket'>
            Create Ticket
          </Link>
        </Menu.Item>
        <Menu.Item key="8" icon={<ProfileOutlined />}>
          <Link to='/listTicket' > List Ticket </Link>
        </Menu.Item>
        </SubMenu>
        <SubMenu title="Hotel" key='sub1' icon={<HomeOutlined />}>
          <Menu.Item key="3" icon={<PlusCircleOutlined />}>
          <Link to='/hotels/createHotel'>
            Create Hotel
          </Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<ProfileOutlined />}>
          <Link to='/hotels' > List Hotels </Link>
        </Menu.Item>
        </SubMenu>
        
        <Menu.Item key="5" icon={<CheckOutlined />}>
          <Link to='/createFacility'>
            Create Facility
          </Link>
          </Menu.Item>
        <Menu.Item key="6" icon={<LogoutOutlined />} onClick={onClick}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default Navbar