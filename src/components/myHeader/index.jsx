import React, { memo, useEffect, useState } from 'react';
import { Layout, Avatar } from 'antd';
import { headerCon } from '../../asset/data/local-data';
import { NavLink, useLocation, Link } from 'react-router-dom';
import './index.css';

const { Header } = Layout;

function MyHeader() {
    const [userinfo, setUserinfo] = useState({})
    userinfo.username = localStorage.getItem('username');
    userinfo.userAvatar = localStorage.getItem('userAvatar').slice(2)
    userinfo.uid = localStorage.getItem('uid')

    console.log('userinfo', userinfo)
    return (
        <Header style={{ display: 'flex', backgroundColor: 'rgb(22, 54, 51)' }}>
            <div className="headerBar">
                {headerCon.map((item) => {
                    return (
                        <NavLink key={item.key} className="headerLink" to={item.key}>
                            {item.label}
                        </NavLink>
                    );
                })}
            </div>
            <div className="userinfo">
            <Link to="/home/editprofile" style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                    <Avatar
                        size={{
                            xs: 15,
                            sm: 20,
                            md: 25,
                            lg: 40,
                            xl: 50,
                            xxl: 63
                        }}
                        src={require('./' + userinfo.userAvatar)}
                    />
                    <span style={{ position: 'relative', marginLeft: '10px', color: 'white' }}>{userinfo.username}</span>
                </Link>
            </div>
        </Header>
    );
};

export default memo(MyHeader);
