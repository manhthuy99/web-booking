import React from 'react';
import { Row, Col, Progress } from 'antd';
import CommentBox from '../Comment/CommentBox';


const Review = () => {
    const list = [
        {
            title: 'Tuyệt vời',
            percent: 20
        },
        {
            title: 'Rất tốt',
            percent: 40
        },
        {
            title: 'Hài lòng',
            percent: 50
        },
        {
            title: 'Trung bình',
            percent: 40

        },
        {
            title: 'Kém',
            percent: '0'
        }
    ]
    return (
        <div style={{ marginTop: '30px', backgroundColor: '#fff', padding: '30px 30px', borderRadius: '10px'}}>
            <Row>
                <Col span={6}>
                    <Progress
                        type="circle"
                        strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }}
                        percent={90}
                        format={percent => `${percent}`}
                    />
                </Col>
                <Col span={12}>
                    {
                        list.map((value, i) => {
                            return (
                                <div style={{ display: 'inline' }}>
                                    <h4>{value.title}</h4>
                                    <Progress percent={value.percent} format={percent => `${percent}`} status="active" />
                                </div>
                            )

                        })
                    }
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <CommentBox />
                </Col>
            </Row>
        </div>

    )
}

export default Review