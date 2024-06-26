import React, { useEffect, useState, memo, useRef } from 'react';
import { Avatar, Button, List, Skeleton, Modal, Input, FloatButton } from 'antd';
import './index.css';
import useRequest from 'server/http';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

const Personal = () => {
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [updateCont, setUpdateCont] = useState();
    const [isModalOpen, setIsModalOpen] = useState([]);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const updateArticleRef = useRef();
    const createArticleRef = useRef();
    const navigate = useNavigate()

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
        setIsNewModalOpen(true)
    }
    const handleOk = (idx, target, isUpdate) => {
        console.log(updateArticleRef.current.value);
        if (isUpdate === true) {
            // useRequest.post({ url: `/article/update` }); 没写更新示例
        } else {
            // 删除文章
            useRequest.post({
                url: `/article/delete/${idx}`
            });
        }
        setIsModalOpen((p) => {
            p[idx] = target;
            return [...p];
        });
    };
    const handleCreateOK = () => {
        useRequest
            .post({
                url: '/article/create'
            }).then(res => {
                console.log('createArticle', res);
                setIsNewModalOpen(false)
            })
    }
    const handleCancel = (idx, target) => {
        setIsModalOpen((p) => {
            p[idx] = target;
            return [...p];
        });
    };
    const handleCreateCancel = () => {
        setIsNewModalOpen(false)
    }
    const logOutUser = () => {
        navigate('/login')
        // localStorage.removeItem("username");
        // localStorage.removeItem("userAvatar");
        // localStorage.removeItem("uid");
        console.log('注销用户')
    }
    useEffect(() => {
        const uid = localStorage.getItem('uid');
        useRequest
            .get({
                url: `/article/info/${uid}`
            })
            .then((res) => {
                setList(res);
                res.forEach(() => {
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
                                <a key="list-loadmore-more">more</a>
                            ]}
                        >
                            <Modal
                                title={item.atitle}
                                open={isModalOpen[item.aid]}
                                onOk={() => {
                                    handleOk(item.aid, false, true);
                                }}
                                onCancel={() => {
                                    handleCancel(item.aid, false);
                                }}
                            >
                                <textarea ref={updateArticleRef}>{updateCont}</textarea>
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
                <FloatButton onClick={logOutUser} tooltip={<div>注销</div>} />
            </FloatButton.Group>
            <Modal
                title='新文章'
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
