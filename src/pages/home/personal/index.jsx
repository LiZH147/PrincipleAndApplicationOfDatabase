import React, { useEffect, useState, memo, useRef } from 'react';
import { Button, List, Skeleton, Modal, FloatButton } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogoutOutlined } from '@ant-design/icons';
import './index.css';

const Personal = () => {
    const [list, setList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState([]);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const updateArticleRef = useRef();
    const createArticleRef = useRef();
    const articleTitle = useRef();
    const updateArticleTitle = useRef();
    const navigate = useNavigate();

    const showModal = (idx, target, isUpdate) => {
        setIsModalOpen((p) => {
            p[idx] = target;
            return [...p];
        });
    };
    const showCreateModal = () => {
        setIsNewModalOpen(true);
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
    const handleCreateOK = () => {
        const uid = localStorage.getItem('uid');
        console.log(createArticleRef.current.value);
        console.log(articleTitle.current.value);
        const newArticle = {
            uid: uid,
            atitle: articleTitle.current.value,
            atime: new Date().toISOString().slice(0, 19).replace('T', ' '),
            acontent: createArticleRef.current.value
        };
        axios.post('http://localhost:9090/article/create', newArticle).then((res) => {
            console.log(res);
            setIsNewModalOpen(false);
        });
    };
    const handleCancel = (idx, target) => {
        setIsModalOpen((p) => {
            p[idx] = target;
            return [...p];
        });
    };
    const handleCreateCancel = () => {
        setIsNewModalOpen(false);
    };
    const logOutUser = () => {
        navigate('/login');
        localStorage.removeItem('username');
        localStorage.removeItem('userAvatar');
        localStorage.removeItem('uid');
        console.log('注销用户');
    };
    useEffect(() => {
        const uid = localStorage.getItem('uid');
        axios.get(`http://localhost:9090/article/info/${uid}`).then((res) => {
            setList(res.data);
            res.data.forEach(() => {
                isModalOpen.push(false);
            });
            console.log('personalArticles', res);
        });
    }, []);

    return (
        <div style={{ height: '100vh' }}>
            <div className="articles">
                <List
                    style={{
                        width: '60%',
                        margin: 'auto',
                        borderRadius: '12px',
                        border: '2px solid black'
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

                            <Skeleton
                                style={{ margin: 'auto' }}
                                title={false}
                                loading={false}
                                active
                            >
                                <List.Item.Meta
                                    style={{ marginLeft: 8 }}
                                    description={item.atitle}
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </div>
            <FloatButton.Group>
                <FloatButton onClick={showCreateModal} tooltip={<div>新建文章</div>} />
                <FloatButton onClick={logOutUser} icon={<LogoutOutlined />} tooltip={<div>注销用户</div>} />
            </FloatButton.Group>
            <Modal
                title="新建文章"
                open={isNewModalOpen}
                onOk={() => {
                    handleCreateOK();
                }}
                onCancel={() => {
                    handleCreateCancel();
                }}
            >
                <input placeholder="请输入标题" type="text" ref={articleTitle} />
                <textarea
                    style={{ width: 400, height: 300 }}
                    placeholder="请输入文章"
                    ref={createArticleRef}
                ></textarea>
            </Modal>
        </div>
    );
};

export default memo(Personal);
