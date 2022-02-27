import React from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import './TicketCard.css';


const TicketCard = ({ guest, to, from, departureDate, seatClass, airlines, typeTicket, price }) => {
    return (
        <div className='TicketCard'>
            <div className='top'>
                <h1>{airlines}</h1>
            </div>
            <div className='bottom' style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '500' }}>
                <div>
                    <div style={{ display: 'flex' }}>
                        <div>{to}</div>
                        <div><ArrowRightOutlined /></div>
                        <div>{from}</div>
                    </div>
                    <div>{departureDate}</div>
                    <div>{typeTicket}</div>
                </div>
                <div>
                    <div>{guest} khách</div>
                    <div>{seatClass}</div>
                </div>
                <div>
                    <div style={{fontSize: '20px'}}>{price}</div>
                    <Button style={{backgroundColor: 'orange'}}>
                        Đặt vé 
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TicketCard