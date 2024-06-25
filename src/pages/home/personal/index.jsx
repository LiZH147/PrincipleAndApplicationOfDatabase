import React, { useEffect, useState, memo } from 'react';
import { Avatar, Button, List, Skeleton } from 'antd';
import './index.css';
import useRequest from 'server/http';
const Personal = () => {
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    useEffect(() => {
        const uid = localStorage.getItem('uid');
        useRequest.get({
            url:`/article/info/${uid}`
        }).then((res) => {
            setList(res)
            console.log('personalArticles',res)
        })
    }, []);
    return (
        <div style={{ height: '100vh', color: 'white' }}>
            <div className="articles">
                <List
                style={{width:'60%', margin:'auto',  borderRadius: '12px', border:'2px solid white'}}
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={list}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                <a key="list-loadmore-edit">edit</a>,
                                <a key="list-loadmore-more">more</a>
                            ]}
                        >
                            <Skeleton style={{margin:'auto'}} title={false} loading={false} active>
                                <List.Item.Meta
                                    description={item.atitle}
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </div>
            <div className="deleteUser">注销</div>
        </div>
    );
};

export default memo(Personal);
