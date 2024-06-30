import React, { useEffect, useState, memo, useRef } from 'react';
import { Button, List, Skeleton, Modal, FloatButton } from 'antd';
import axios from 'axios';
import './index.css';

const Bulletin = () => {
    const [list, setList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState([]);
    const [isCreateModelOpen, setIsCreateModelOpen] = useState(false);
    const updateBulletinRef = useRef();
    const createBulletinRef = useRef();

    const showModal = (idx, target, isUpdate) => {
        setIsModalOpen((p) => {
            p[idx] = target;
            return [...p];
        });
    };
    const handleOk = (idx, bid, target) => {
        const uid = localStorage.getItem('uid');
        const updateBulletin = {
            bid: bid,
            uid: 1,
            btime: new Date().toISOString().slice(0, 19).replace('T', ' '),
            bcontent: updateBulletinRef.current.value
        };
        let tempList = list;
        tempList[idx] = updateBulletin;
        setList(tempList);

        console.log(updateBulletin);
        axios.post(`http://localhost:9090/bulletin/update`, updateBulletin).then((res) => {
            console.log(res);
        });
        setIsModalOpen((p) => {
            p[bid] = target;
            return [...p];
        });
    };
    const deleteBulletin = (idx) => {
        axios.post(`http://localhost:9090/bulletin/delete/${idx}`);
        let newList = [];
        list.forEach((item, index) => {
            if (item.bid !== idx) {
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
    const showCreateModal = () => {
        setIsCreateModelOpen(true);
    };
    const handleCreateOK = () => {
        const newBulletin = {
            uid: 1,
            btime: new Date().toISOString().slice(0, 19).replace('T', ' '),
            bcontent: createBulletinRef.current.value
        };
        axios.post('http://localhost:9090/bulletin/create', newBulletin).then((res) => {
            console.log(res);
            setIsCreateModelOpen(false);
        });
        let temp = list;
        temp.push(newBulletin);
        setList(temp)
    };
    const handleCreateCancel = () => {
        setIsCreateModelOpen(false);
    };

    useEffect(() => {
        axios.get(`http://localhost:9090/bulletin/info`).then((res) => {
            setList(res.data);
            res.data.forEach(() => {
                isModalOpen.push(false);
            });
            console.log('bulletin', res);
        });
    }, []);

    return (
        <div className="bulletins">
            <div className="header">
                <div className="left">
                    <h3>公告管理</h3>
                </div>
                <div className="right">
                    <Button onClick={showCreateModal}>新建公告</Button>
                </div>
                <Modal
                    title="新建公告"
                    open={isCreateModelOpen}
                    onOk={() => {
                        handleCreateOK();
                    }}
                    onCancel={() => {
                        handleCreateCancel();
                    }}
                >
                    <textarea
                        style={{ width: 400, height: 300 }}
                        placeholder="请输入文章内容"
                        ref={createBulletinRef}
                    ></textarea>
                </Modal>
            </div>
            <List
                style={{
                    width: '90%',
                    margin: 'auto 20px',
                    borderRadius: '12px',
                    border: '2px solid white'
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
                                    showModal(item.bid, true, true);
                                }}
                            >
                                编辑
                            </Button>,
                            <Button type="primary" onClick={() => deleteBulletin(item.bid)}>
                                删除
                            </Button>
                        ]}
                    >
                        <Modal
                            open={isModalOpen[item.bid]}
                            onOk={() => {
                                handleOk(idx, item.bid, false, item.title);
                            }}
                            onCancel={() => {
                                handleCancel(item.bid, false);
                            }}
                        >
                            <textarea
                                style={{ width: 400, height: 100, marginTop: 10 }}
                                ref={updateBulletinRef}
                                defaultValue={item.bcontent}
                            ></textarea>
                        </Modal>

                        <Skeleton style={{ margin: 'auto' }} title={false} loading={false} active>
                            <List.Item.Meta style={{ marginLeft: 8 }} description={item.bcontent} />
                        </Skeleton>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default memo(Bulletin);
