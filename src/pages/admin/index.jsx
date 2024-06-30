import React, { memo, Suspense } from 'react';
import { Layout, Menu, theme } from 'antd';
import { LaptopOutlined, NotificationOutlined, ProfileOutlined } from '@ant-design/icons';
import Article from './article';
import Comment from './coment';
import './index.css';
import Bulletin from './bulletin';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const leftBarData = [
    {
        icon: ProfileOutlined,
        href: 'article'
    },
    {
        icon: LaptopOutlined,
        href: 'coment'
    },
    {
        icon: NotificationOutlined,
        href: 'bulletin'
    }
];

const items2 = leftBarData.map((item, index) => {
    const key = String(index + 1);
    return {
        key: `/admin/${item.href}`,
        icon: React.createElement(item.icon),
        label: `${item.href}`
    };
});

const Admin = () => {
    const navigate = useNavigate();
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken();
    return (
        <>
            <Header style={{ display: 'flex', backgroundColor: 'rgb(22, 54, 51)' }}>
                <div className="headerBar">管理员管理界面</div>
            </Header>
            <Layout className="leftBar">
                <Sider
                    style={{
                        background: colorBgContainer
                    }}
                    width={200}
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['/admin/article']}
                        style={{
                            height: '100%'
                        }}
                        onClick={(e) => {
                            navigate(`${e.key}`);
                            console.log(e);
                        }}
                        items={items2}
                    />
                </Sider>
                <Content>
                    <div className="adminPage">
                        <Suspense fallback="">
                            <Outlet />
                        </Suspense>
                    </div>
                </Content>
            </Layout>
        </>
    );
};

export default memo(Admin);
