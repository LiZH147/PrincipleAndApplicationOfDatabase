import React, { memo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form, Input, Image, Upload, Avatar } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import './index.css';

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const Register = () => {
    const navigate = useNavigate();
    const userAvatar = 'userimg/1.jpg'
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-xxx',
            percent: 50,
            name: 'image.png',
            status: 'uploading',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-5',
            name: 'image.png',
            status: 'error',
        },
    ]);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    const onFinish = (values) => {
        console.log(values)
        const newUser = {
            name: values.username,
            password: values.password,
            email: values.email,
            uprofile: './userimg/1.jpg'
        };
        console.log('newUser', newUser)
        axios
            .post('http://localhost:9090/user/create', newUser, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                console.log('注册成功');
                navigate('/login');
            });
    };
    return (
        <div className="container">
            <div className="left"></div>
            <div className="right">
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ width: '60%', minWidth: 500 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    {/* <div className="avatar"> */}
                    <Form.Item
                        label="头像"
                        name="avatar"
                    >
                        <Avatar
                            size={{
                                xs: 15,
                                sm: 20,
                                md: 25,
                                lg: 40,
                                xl: 50,
                                xxl: 63
                            }}
                            // src='https://img.lzxjack.top:99/202203302348298.webp'
                            // src={userinfo.Avatar}
                            src={require('../../components/myHeader/' + userAvatar)}
                        />
                        {/* <Upload
                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            listType="picture-circle"
                            fileList={fileList}
                            showUploadList={false}
                            onPreview={handlePreview}
                            onChange={handleChange}
                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                        {previewImage && (
                            <Image
                                wrapperStyle={{
                                    display: 'none',
                                }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )} */}
                    </Form.Item>

                    {/* </div> */}
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!'
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16
                        }}
                        style={{ marginLeft: '250px' }}
                    >
                        <Button type="primary" htmlType="submit">
                            注册
                        </Button>
                        <Button
                            style={{
                                backgroundColor: 'gray',
                                color: 'black',
                                marginLeft: '10px'
                            }}
                        >
                            <Link to="/login">返回</Link>
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default memo(Register);
