import React, { memo, Suspense } from 'react';
import MyHeader from 'components/myHeader';
import Bulletin from 'components/bulletin/bulletin';
import { Outlet } from 'react-router-dom';
import './index.css'

const Home = () => {
    return (
        <div className="home" >
            <MyHeader />
            <Bulletin />
            <Suspense fallback="">
                <Outlet />
            </Suspense>
        </div>
    );
};

export default memo(Home);
