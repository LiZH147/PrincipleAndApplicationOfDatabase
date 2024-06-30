import React, { useEffect, useState, memo, useRef } from 'react';
import { Button, List, Skeleton, Modal } from 'antd';
import axios from 'axios';
import './index.css';

const Article = () => {
    const [list, setList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState([]);
    const updateArticleRef = useRef();
    const updateArticleTitle = useRef();

    const showModal = (idx, target, isUpdate) => {
        setIsModalOpen((p) => {
            p[idx] = target;
            return [...p];
        });
    };
    const handleOk = (idx, aid, target) => {
        const uid = localStorage.getItem('uid');
        const updateArticle = {
            aid: aid,
            uid: uid,
            atitle: updateArticleTitle.current.value,
            atime: new Date().toISOString().slice(0, 19).replace('T', ' '),
            acontent: updateArticleRef.current.value
        };
        let tempList = list;
        tempList[idx] = updateArticle;
        setList(tempList);

        console.log(updateArticle);
        axios.post(`http://localhost:9090/article/update`, updateArticle).then((res) => {
            console.log(res);
        });
        setIsModalOpen((p) => {
            p[aid] = target;
            return [...p];
        });
    };
    const deleteArticle = (idx) => {
        axios.post(`http://localhost:9090/article/delete/${idx}`);
        let newList = [];
        list.forEach((item, index) => {
            if (item.aid !== idx) {
                newList.push(item);
            }
        });
        setList(newList);
    };
    const handleCancel = (idx, target) => {
        setIsModalOpen((p) => {
            p[idx] = target;
            return [...p];
        });
    };

    useEffect(() => {
        axios.get(`http://localhost:9090/article/info`).then((res) => {
            setList(res.data);
            res.data.forEach(() => {
                isModalOpen.push(false);
            });
            console.log('Articles', res);
        });
    }, []);

    return (
        <div className="article">
            <h3 style={{ color: 'white' }}>文章管理</h3>
            <List
                style={{
                    margin: 'auto',
                    marginRight: '20px',
                    borderRadius: '12px',
                    border: '2px solid white',
                    color: 'white'
                }}
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={list}
                renderItem={(item, idx) => (
                    <List.Item
                        actions={[
                            <Button
                                type="primary"
                                onClick={() => {
                                    showModal(item.aid, true, true);
                                }}
                            >
                                编辑
                            </Button>,
                            <Button type="primary" onClick={() => deleteArticle(item.aid)}>
                                删除
                            </Button>
                        ]}
                    >
                        <Modal
                            open={isModalOpen[item.aid]}
                            onOk={() => {
                                handleOk(idx, item.aid, false, item.title);
                            }}
                            onCancel={() => {
                                handleCancel(item.aid, false);
                            }}
                        >
                            <input
                                defaultValue={item.atitle}
                                type="text"
                                ref={updateArticleTitle}
                            />

                            <textarea
                                style={{ width: 400, height: 300, marginTop: 10 }}
                                ref={updateArticleRef}
                                defaultValue={item.acontent}
                            ></textarea>
                        </Modal>

                        <Skeleton style={{ margin: 'auto' }} title={false} loading={false} active>
                            <List.Item.Meta style={{ marginLeft: 8 }} description={item.atitle} />
                        </Skeleton>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default memo(Article);
