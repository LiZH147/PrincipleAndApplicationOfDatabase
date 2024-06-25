import React, { useEffect, useState, memo, useRef } from 'react';
import { Avatar, Button, List, Skeleton, Modal, Input } from 'antd';
import './index.css';
import useRequest from 'server/http';

const { TextArea } = Input;

const Personal = () => {
    const [data, setData] = useState([]);
    const [list, setList] = useState([{aid:0, acontent:'dsadas'},{aid:1}]);
    const [updateCont, setUpdateCont] = useState();
    const [isModalOpen, setIsModalOpen] = useState([false, false]);
    const updateArticleRef = useRef();

    const showModal = (idx, target, isUpdate) => {
        if (isUpdate === true) {
            setUpdateCont(list[idx]); // 设置内容为文章内容
        }
        setIsModalOpen((p) => {
            p[idx] = target;
            return [...p];
        });
    };
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
    const handleCancel = (idx, target) => {
        setIsModalOpen((p) => {
            p[idx] = target;
            return [...p];
        });
    };

    // useEffect(() => {
    //     const uid = localStorage.getItem('uid');
    //     useRequest
    //         .get({
    //             url: `/article/info/${uid}`
    //         })
    //         .then((res) => {
    //             setList(res);
    //             res.forEach(() => {
    //                 isModalOpen.push(false);
    //             });
    //             console.log('personalArticles', res);
    //         });
    // }, []);

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
                                title="Basic Modal"
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
            <div className="deleteUser">注销</div>
        </div>
    );
};

export default memo(Personal);
