import React, { memo, useEffect, useState } from 'react';
import { Avatar, List, Space } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import useRequest from 'server/http';
import { Link } from 'react-router-dom';

// const data = Array.from({ length: 23 }).map((_, i) => ({
//     href: 'https://ant.design',
//     title: `ant design part ${i}`,
//     avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
//     description:
//         'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//     content:
//         'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
// }));

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const Articles = () => {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        // 渲染时运行
        useRequest
            .get({
                url: '/article/info'
            })
            .then((res) => {
                setArticles(res);
                console.log('articles', articles);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <div style={{ height: '150vh', color: 'white' }}>
            <List
                style={{ width: '65%', margin: 'auto', height: '100vh' }}
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 8,
                    align: 'center'
                }}
                dataSource={articles}
                renderItem={(item) => (
                    <Link to={`/home/articles/content?aid=${item.title}`}>
                        <List.Item
                            style={{ border: '2px solid white', borderRadius:'15px' }}
                            key={item.title}
                            actions={[
                                <IconText
                                    icon={StarOutlined}
                                    text="156"
                                    key="list-vertical-star-o"
                                />,
                                <IconText
                                    icon={LikeOutlined}
                                    text="156"
                                    key="list-vertical-like-o"
                                />,
                                <IconText
                                    icon={MessageOutlined}
                                    text="2"
                                    key="list-vertical-message"
                                />
                            ]}
                        >
                            <List.Item.Meta
                                title={
                                    <a
                                        style={{ color: 'white', fontSize: '25px' }}
                                        href={item.href}
                                    >
                                        {item.atitle}
                                    </a>
                                }
                                description={
                                    <span style={{ color: 'white' }}>{item.description}</span>
                                }
                            />
                            <div style={{ color: 'white' }}>{item.acontent}</div>
                        </List.Item>
                    </Link>
                )}
            />
        </div>
    );
};

export default memo(Articles);
