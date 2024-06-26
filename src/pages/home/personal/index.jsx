import React, { useEffect, useState, memo, useRef } from 'react';
import { Avatar, Button, List, Skeleton, Modal, Input, FloatButton } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogoutOutlined } from "@ant-design/icons";
import './index.css';


const { TextArea } = Input;

const Personal = () => {
    const [list, setList] = useState([]);
    const [updateCont, setUpdateCont] = useState();
    const [isModalOpen, setIsModalOpen] = useState([]);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const updateArticleRef = useRef();
    const createArticleRef = useRef();
    const navigate = useNavigate();

    const showModal = (idx, target, isUpdate) => {
        if (isUpdate === true) {
            setUpdateCont(list[idx]); // 设置内容为文章内容
        }
        setIsModalOpen((p) => {
            p[idx] = target;
            return [...p];
        });
    };
    const showCreateModal = () => {
        setIsNewModalOpen(true);
    };
    const handleOk = (idx, target) => {
        const uid = localStorage.getItem('uid');
        const updateArticle = {
            aid: idx,
            uid: uid,
            atitle: 'dasdsad',
            atime: new Date().toISOString().slice(0, 19).replace('T', ' '),
            acontent: updateArticleRef.current.value
        };
        console.log(updateArticle)
        axios.post(`http://localhost:9090/article/update`, updateArticle).then((res) => {
            console.log(res)
        })
        setIsModalOpen((p) => {
            p[idx] = target;
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
        const newArticle = {
            uid: uid,
            atitle: 'dasdsad',
            atime: new Date().toISOString().slice(0, 19).replace('T', ' '),
            acontent: createArticleRef.current.value
        };
        axios.post('http://localhost:9090/article/create', newArticle).then((res) => {
            console.log(res);
            setIsNewModalOpen(false)
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
        <div style={{ height: '100vh', color: 'white' }}>
            <div className="articles">
                <List
                    style={{
                        width: '60%',
                        margin: 'auto',
                        borderRadius: '12px',
                        border: '2px solid white'
                    }}
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={list}
                    renderItem={(item) => (
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
                                title={item.atitle}
                                open={isModalOpen[item.aid]}
                                onOk={() => {
                                    handleOk(item.aid, false);
                                }}
                                onCancel={() => {
                                    handleCancel(item.aid, false);
                                }}
                            >
                                <textarea
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
                                <List.Item.Meta description={item.atitle} />
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </div>
            <FloatButton.Group>
                <FloatButton onClick={showCreateModal} tooltip={<div>新建文章</div>} />
                <FloatButton icon={<LogoutOutlined />} onClick={logOutUser} tooltip={<div>注销</div>} />
            </FloatButton.Group>
            <Modal
                title="新文章"
                open={isNewModalOpen}
                onOk={() => {
                    handleCreateOK();
                }}
                onCancel={() => {
                    handleCreateCancel();
                }}
            >
                <textarea ref={createArticleRef}></textarea>
            </Modal>
        </div>
    );
};

export default memo(Personal);
