import React, { memo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, Button, Input, Avatar, List, Space } from 'antd';
import { LikeOutlined, CommentOutlined } from '@ant-design/icons';
import '../index.css';
import useRequest from 'server/http';
import MyHeader from 'components/myHeader';
import axios from 'axios';

const ArticleContent = () => {
    const [search, setSearch] = useSearchParams();
    const title = search.get('atitle');
    const content = search.get('acontent');
    const aid = search.get('aid');
    const [commentData, setCommentData] = useState([])
    const [newComent, setNewComent] = useState()

    const createComent = () => {
        const uid = localStorage.getItem('uid');
        const newComenttemp = {
            uid:uid,
            aid:aid,
            ccontent:newComent,
            ctime:new Date().toISOString().slice(0, 19).replace('T', ' '),
        }
        axios.post(`http://localhost:9090/coment/create`, newComenttemp).then((res) => {
            console.log(res)
        })
        console.log('ref', newComenttemp)
    }
    const getComentName = async (uid) => {
        try {
            const res = await useRequest.get({
                url: `/user/info/${uid}`
            });
            console.log("name", res[0].name);
            return res[0].name;
        } catch (error) {
            console.error('Error fetching user info:', error);
            return null;
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await useRequest.get({
                    url: `/coment/info/${search.get('aid')}`
                });
                let temp = [];
                for (const item of res) {
                    const uname = await getComentName(item.uid);
                    console.log("u", uname);
                    let obj = {
                        name: uname,
                        uid: item.uid,
                        content: item.ccontent,
                        time: item.ctime
                    };
                    temp.push(obj);
                }
                setCommentData(temp);
                console.log('comments', temp);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="home" style={{}}>
            <MyHeader />
            <div style={{ color: 'white', textAlign: 'center', fontSize: '25px', height: '50px', marginTop:'15px' }}>
                <span>{title}</span>
            </div>
            <Card
                style={{
                    marginTop: 3,
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
                        <span style={{ margin: '0 10px 0 5px' }}>{commentData.length}</span>
                        <CommentOutlined />
                        <span style={{ margin: '0 10px 0 5px' }}>{commentData.length}</span>
                    </div>
                    <div className="comment">
                        <Space.Compact
                            style={{
                                width: '100%'
                            }}
                        >
                            <Input onChange={(e) => {setNewComent(e.target.value)}} placeholder="Combine input and button" />
                            <Button type="primary" onClick={createComent}>发表评论</Button>
                        </Space.Compact>
                    </div>
                </div>
                <List
                    itemLayout="horizontal"
                    dataSource={commentData}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                                    />
                                }
                                title={
                                    <a style={{ color: 'white' }} href="https://ant.design">
                                        {item.name}
                                    </a>
                                }
                                description={item.content}
                            />
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    );
};

export default memo(ArticleContent);
