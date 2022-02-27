import React from 'react';
import { Layout } from 'antd';
import Navbar from '../NavBar/Navbar';

const { Header, Content } = Layout;
const MainLayout = ({ children }) => {
  return (
    <Layout className='layout' style={{ minHeight: '100vh' }}>
       <Navbar />
      {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
      <Content style={{ margin: '0 16px',  backgroundColor: 'rgba(230,234,237,1.00)'}}>
        {children}
      </Content>
    </Layout>

  )
}

export default MainLayout