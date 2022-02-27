import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import MainLayout from '../../components/layout/MainLayout'
import TicketCard from '../../components/TicketCard';
import request from '../../api/request';

const ListTicket = () => {
    const [listTicket, setListTickets] = useState([]);
    const fetchListTicket = async () => {
        const res = await request({
            method: 'GET',
            url: '/ticketPlane'
        })
        console.log(res.data)
        if (res.success) {
            setListTickets(res.data)
        }
    }
    useEffect(() => {
        fetchListTicket();
    }, [])
    return (
        <MainLayout>
        <h1 style={{textAlign: 'center'}}>List Ticket</h1>
        <Row gutter={16} justify='center'>
            <Col md={{span: 16}}>
                {
                listTicket.map((value) => {
                    return <TicketCard
                        key={value._id}
                        guest={value.guest}
                        to={value.to}
                        from={value.from}
                        departureDate={value.departureDate}
                        seatClass={value.seatClass}
                        airlines={value.airlines}
                        typeTicket={value.typeTicket}
                        price={value.price}
                    />
                })
            }
            </Col>
            
        </Row>
            
        </MainLayout>
    )
}

export default ListTicket