import React, { memo, useEffect, useState } from 'react';
import { Carousel } from 'antd';
import useRequest from 'server/http';

const contentStyle = {
    height: '200px',
    color: '#fff',
    lineHeight: '200px',
    textAlign: 'center',
};

const bulletinCon = [
    { key: 1, content: '公告1' },
    { key: 2, content: '公告2' },
    { key: 3, content: '公告3' },
    { key: 4, content: '公告4' }
];

const Bulletin = () => {
    const [bulletinCon, setBulletinCon] = useState([]);
    useEffect(() => {
        useRequest.get({
            url: '/bulletin/info',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            setBulletinCon(res)
            console.log('bulletin', res)
        })
    }, bulletinCon)
    return (
        <Carousel autoplay style={{ width: '50%', margin: 'auto' }}>
            {bulletinCon.map((item, idx) => {
                return (
                    <div key={idx}>
                        <h3 style={contentStyle}>{item.bcontent}</h3>
                    </div>
                );
            })}
        </Carousel>
    );
};

export default memo(Bulletin);
