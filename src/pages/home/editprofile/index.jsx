import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import './index.css';
import axios from 'axios';

const { Title } = Typography;

const EditProfile = () => {
    const [form] = Form.useForm();

    const [user, setUser] = useState({
        username: localStorage.getItem('username'),
        userAvatar: localStorage.getItem('userAvatar').slice(2),
        uid: localStorage.getItem('uid')
    });

    useEffect(() => {
        form.setFieldsValue(user);
    }, [user, form]);

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        const { uid, username, userAvatar } = user;

        const userData = {
            uid,
            name: values.name,
            password: values.password,
            email: values.email,
            uprofile: './'+userAvatar
        };

        axios.post('http://localhost:9090/user/update', userData)
            .then(response => {
                console.log('Update successful:', response.data);
                message.success('用户信息更新成功');
                localStorage.setItem('username', values.username);
                localStorage.setItem('userAvatar', values.userAvatar);
                setUser(values);
                setTimeout(() => {
                    window.location.href = '/login';
                }, 3000);
            })
            .catch(error => {
                console.error('Update failed:', error);
                message.error('用户信息更新失败');
            });
    };

    return (
        <div className="edit-profile-container">
            <div className="edit-profile-content">
                <Title level={2} style={{ textAlign: 'center', color: 'white' }}>修改用户信息</Title>
                <Form
                    form={form}
                    name="edit_profile"
                    onFinish={onFinish}
                    layout="vertical"
                    className="edit-profile-form"
                >
                    <Form.Item
                        name="name"
                        label="新用户名"
                        rules={[{ required: true, message: '请输入用户名' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="新密码"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="新邮箱"
                        rules={[{ required: true, message: '请输入邮箱地址' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item className="form-item-button">
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default EditProfile;
