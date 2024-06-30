import React, { memo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form, Input, Image, Upload } from 'antd';
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
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            console.log('只能上传 JPG/PNG 文件!');
        }
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isLt1M) {
            console.log('图片不能超过1MB!');
        }
        return isJpgOrPng && isLt1M;
    };
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        // 当上传完毕
        if (info.file.status === 'done') {
            setLoading(false);
            // 判断是否上传成功
            if (info.file.response.code === 200) {
                // 把返回的图像地址设置给 imageUrl
                setImageUrl(info.file.response.data.imageUrl); // 取决于服务端返回的字段名
            }
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8
                }}
            >
                上传
            </div>
        </div>
    );
    const onFinish = (values) => {
        console.log(values)
        const newUser = {
            name: values.username,
            password: values.password,
            email: values.email,
            uprofile: !values.avatar ? values.avatar.file.name : null
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
                        <Upload
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="http://43.138.199.119/sqlFinal/avatarImgs"
                            // action="../../asset/imgs/"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                            name="avatar"
                        >
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt="avatar"
                                    style={{
                                        width: '100%'
                                    }}
                                />
                            ) : (
                                uploadButton
                            )}
                        </Upload>
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
