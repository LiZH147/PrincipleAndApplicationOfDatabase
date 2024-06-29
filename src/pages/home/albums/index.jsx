import React, { memo, useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import useRequest from 'server/http';

// const imgsData = [
//     {
//         alt: '1',
//         src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
//     },
//     {
//         alt: '2',
//         src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
//     },
//     {
//         alt: '3',
//         src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
//     },
//     {
//         alt: '4',
//         src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
//     },
//     {
//         alt: '5',
//         src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
//     },
//     {
//         alt: '6',
//         src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
//     },
//     {
//         alt: '7',
//         src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
//     },
//     {
//         alt: '8',
//         src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
//     },
//     {
//         alt: '9',
//         src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
//     }
// ];

const Albums = () => {
    const [imgsData, setImgsData] = useState([]);
    useEffect(() => {
        const uid = localStorage.getItem('uid');
        useRequest
            .get({
                url:`/album/info/${uid}`
            }).then((res) => {
                let imgdata = [];
                res.forEach((item, idx) => {
                    let obj = {
                        alt:res[0].pid,
                        src:'http://localhost' + res[0].plink.slice(1)
                    }
                    imgdata.push(obj)
                });
                
                setImgsData(imgdata)
                console.log('albums',res)
            })
    })
    return (
        <Row gutter={16}>
            {imgsData.map((item) => {
                return (
                    <Col span={4} style={{marginBottom: '10px'}}>
                        <Card
                            hoverable
                            style={{
                                width: 240
                            }}
                            cover={<img alt={item.alt} src={item.src} style={{width: 240, height: 310}} />}
                        ></Card>
                    </Col>
                );
            })}
        </Row>
    );
};

export default memo(Albums);
