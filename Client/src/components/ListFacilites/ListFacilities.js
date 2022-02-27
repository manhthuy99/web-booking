import React from 'react';
import { CheckOutlined } from '@ant-design/icons';

const padding = {
    paddingRight: '15px'
}
const ListFacilities = () => {
  return (
    <div style={{display: 'flex', fontSize: '15px'}}>
        <div style={padding}><CheckOutlined />Máy lạnh</div>
        <div style={padding} className='facility'><CheckOutlined />Wifi</div>
        <div style={padding} className='facility'><CheckOutlined />Lễ tân 24h</div>
        <div style={padding} className='facility'><CheckOutlined />Thang máy</div>
        <div style={padding} className='facility'><CheckOutlined />Nhà hàng</div>
    </div>
  )
}

export default ListFacilities