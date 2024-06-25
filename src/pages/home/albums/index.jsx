import React, { memo, useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import useRequest from 'server/http';

const imgsData = [
    {
        alt: '1',
        src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
        alt: '2',
        src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
        alt: '3',
        src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
        alt: '4',
        src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
        alt: '5',
        src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
        alt: '6',
        src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
        alt: '7',
        src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
        alt: '8',
        src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    },
    {
        alt: '9',
        src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    }
];

const Albums = () => {
    const [imgDatas, setImgDatas] = useState([]);
    useEffect(() => {
        const uid = localStorage.getItem('uid');
        useRequest
            .get({
                url:`/album/info/${uid}`
            }).then((res) => {
                const imgdata = {
                    alt:res[0].pid,
                    src:res[0].plink
                }
                console.log('albums',res)
            })
    })
    return (
        <Row gutter={16}>
            {imgsData.map((item) => {
                return (
                    <Col span={4}>
                        <Card
                            hoverable
                            style={{
                                width: 240
                            }}
                            cover={<img alt={item.alt} src={item.src} />}
                        ></Card>
                    </Col>
                );
            })}
        </Row>
    );
};

export default memo(Albums);
