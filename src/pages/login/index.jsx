import React, { memo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import useRequest from 'server/http';
import './index.css';

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const Login = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        useRequest
            .get({
                url: `/user/info/${values.username}/${values.password}`
            })
            .then((res) => {
                if (res.length !== 0) {
                    // yj 12345678 2
                    localStorage.setItem('username', res[0].name);
                    localStorage.setItem('userAvatar', res[0].uprofile)
                    localStorage.setItem('uid', res[0].uid)
                    navigate('/home/articles');
                    console.log('Success:', res, localStorage.getItem('userAvatr'));
                } else {
                    alert('登陆失败')
                }
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
                        wrapperCol={{
                            offset: 8,
                            span: 16
                        }}
                        style={{ marginLeft: '250px' }}
                    >
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                        <Button
                            style={{
                                backgroundColor: 'gray',
                                color: 'black',
                                marginLeft: '10px'
                            }}
                        >
                            <Link to="/register">注册</Link>
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default memo(Login);
