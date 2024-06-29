import React, { memo } from 'react';
import { Layout } from 'antd';
import Article from './article';
import Comment from './coment';
import './index.css';

const { Header } = Layout;

const Admin = () => {
    return (
        <>
            <Header style={{ display: 'flex', backgroundColor: 'rgb(22, 54, 51)' }}>
                <div className="headerBar">系统管理界面</div>
            </Header>
            <div className="adminPage">
                <div className="coments">
                    <Comment />
                </div>
                <div className="article">
                    <Article />
                </div>
            </div>
        </>
    );
};

export default memo(Admin);
