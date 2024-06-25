import React, { memo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import useRequest from 'server/http';
import './index.css';

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const Register = () => {
    const navigate = useNavigate();
    const onFinish = (values) => {
        // navigate('/home/articles');
        console.log('Success:', values);
        const newUser = {
            name: values.username,
            password: values.password,
            eamil: values.email,
            uprofile: "0000"
        }
        useRequest.post({
            url: '/user/create',
            headers: {
                'Content-Type': 'application/json',
            },
            newUser
        }).then(res => {
            console.log(res)
        })
    };
    return (
        <div className="container">
            <div className="left">left</div>
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
                    <div className="avatar">头像</div>
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
