import React, { memo, useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import useRequest from 'server/http';

const Albums = () => {
    const [imgsData, setImgsData] = useState([]);
    useEffect(() => {
        const uid = localStorage.getItem('uid');
        useRequest
            .get({
                url: `/album/info/${uid}`
            }).then((res) => {
                let imgdata = [];
                res.forEach((item, idx) => {
                    let obj = {
                        alt: item.pid,
                        src: item.plink.slice(2)
                    }
                    imgdata.push(obj)
                });

                setImgsData(imgdata)
                console.log('albums', imgdata)
            })
    }, [])
    return (
        <Row gutter={16} style={imgsData.length < 12 ? { height: '100vh' } : null}>
            {imgsData.map((item) => {
                return (
                    <Col span={4} style={{ marginBottom: '10px' }}>
                        <Card
                            hoverable
                            style={{
                                width: 300
                            }}
                            
                        ><img alt={item.alt} src={require('./' + item.src)} style={{ width: 256, height: 144, margin:'auto' }} /></Card>
                    </Col>
                );
            })}
        </Row>
    );
};

export default memo(Albums);
