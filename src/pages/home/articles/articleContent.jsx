import React, { memo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, Button, Input, Avatar, List, Space } from 'antd';
import { LikeOutlined, CommentOutlined } from '@ant-design/icons';
import '../index.css';
import MyHeader from 'components/myHeader';

const data = [
    {
        title: 'Ant Design Title 1'
    },
    {
        title: 'Ant Design Title 2'
    },
    {
        title: 'Ant Design Title 3'
    },
    {
        title: 'Ant Design Title 4'
    }
];
const ArticleContent = () => {
    const [search, setSearch] = useSearchParams();
    const [content, setContent] = useState('sss');
    // return(<div>ArticleContent{search.get('aid')}</div>)
    return (
        <div className="home" style={{ height: '100vh' }}>
            <MyHeader />
            <div style={{ color: 'white', textAlign: 'center', fontSize: '25px', height: '50px' }}>
                <span>Title</span>
            </div>
            <Card
                style={{
                    marginTop: 16,
                    width: '50%',
                    margin: 'auto',
                    backgroundColor: 'rgb(12, 29, 27)',
                    color: 'white',
                    border: 0
                }}
                type="inner"
            >
                {content}
                <hr />
                <div className="footbar">
                    <div className="likes">
                        <LikeOutlined />
                        <span style={{ margin: '0 10px 0 5px' }}>11</span>
                        <CommentOutlined />
                        <span style={{ margin: '0 10px 0 5px' }}>15</span>
                    </div>
                    <div className="comment">
                        <Space.Compact
                            style={{
                                width: '100%'
                            }}
                        >
                            <Input defaultValue="Combine input and button" />
                            <Button type="primary">发表评论</Button>
                        </Space.Compact>
                    </div>
                </div>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                                    />
                                }
                                title={<a style={{color:'white'}} href="https://ant.design">{item.title}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    );
};

export default memo(ArticleContent);
