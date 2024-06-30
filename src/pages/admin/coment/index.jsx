import React, { useEffect, useState, memo, useRef } from 'react';
import { Button, List, Skeleton, Modal } from 'antd';
import axios from 'axios';
import './index.css';

const Coment = () => {
    const [list, setList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState([]);
    const updateComentRef = useRef();

    const showModal = (idx, target, isUpdate) => {
        setIsModalOpen((p) => {
            p[idx] = target;
            return [...p];
        });
    };
    const handleOk = (idx, cid, target) => {
        const uid = localStorage.getItem('uid');
        const updateComent = {
            aid: list[idx].aid,
            cid: cid,
            uid: uid,
            ctime: new Date().toISOString().slice(0, 19).replace('T', ' '),
            ccontent: updateComentRef.current.value
        };
        let tempList = list;
        tempList[idx] = updateComent;
        setList(tempList);

        console.log(updateComent);
        axios.post(`http://localhost:9090/coment/update`, updateComent).then((res) => {
            console.log(res);
        });
        setIsModalOpen((p) => {
            p[cid] = target;
            return [...p];
        });
    };
    const deleteComent = (idx) => {
        axios.post(`http://localhost:9090/coment/delete/${idx}`);
        let newList = [];
        list.forEach((item, index) => {
            if (item.cid !== idx) {
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
        axios.get(`http://localhost:9090/coment/info`).then((res) => {
            setList(res.data);
            res.data.forEach(() => {
                isModalOpen.push(false);
            });
            console.log('coments', res);
        });
    }, []);

    return (
        <div className="coment">
            <h3 style={{ marginLeft: '20px', color: 'white' }}>评论管理</h3>
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
                                    showModal(item.cid, true, true);
                                }}
                            >
                                编辑
                            </Button>,
                            <Button type="primary" onClick={() => deleteComent(item.cid)}>
                                删除
                            </Button>
                        ]}
                    >
                        <Modal
                            open={isModalOpen[item.cid]}
                            onOk={() => {
                                handleOk(idx, item.cid, false, item.title);
                            }}
                            onCancel={() => {
                                handleCancel(item.cid, false);
                            }}
                        >
                            <textarea
                                style={{ width: 400, height: 100, marginTop: 10 }}
                                ref={updateComentRef}
                                defaultValue={item.ccontent}
                            ></textarea>
                        </Modal>

                        <Skeleton style={{ margin: 'auto' }} title={false} loading={false} active>
                            <List.Item.Meta style={{ marginLeft: 8 }} description={item.ccontent} />
                        </Skeleton>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default memo(Coment);
