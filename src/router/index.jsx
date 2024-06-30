import React from 'react';
import { Navigate } from 'react-router-dom';

const Articles = React.lazy(() => import('../pages/home/articles/index'));
const Albums = React.lazy(() => import('../pages/home/albums'));
const Personal = React.lazy(() => import('../pages/home/personal'));
const Login = React.lazy(() => import('../pages/login'));
const Home = React.lazy(() => import('../pages/home'));
const Register = React.lazy(() => import('../pages/register'));
const ArticleContent = React.lazy(() => import('../pages/home/articles/articleContent'))
const Admin = React.lazy(() => import('../pages/admin/index'))
const Article = React.lazy(() => import('../pages/admin/article'))
const Bulletin = React.lazy(() => import('../pages/admin/bulletin'))
const Coment = React.lazy(() => import('../pages/admin/coment'))
const EditProfile = React.lazy(() => import('../pages/home/editprofile'));


const routes = [
    {
        path: '/',
        element: <Navigate to='/login' />
    },
    {
        path:'/login',
        element: <Login />
    },
    {
        path:'/register',
        element: <Register />
    },
    {
        path: '/home',
        element: <Home />,
        children: [
            {
                path: '/home',
                element: <Navigate to="/home/articles" />
            },
            {
                path: '/home/articles',
                element: <Articles />
            },
            {
                path: '/home/albums',
                element: <Albums />
            },
            {
                path: '/home/personal',
                element: <Personal />
            },
            {
                path: '/home/editprofile',
                element: <EditProfile />
            }
        ]
    },
    {
        path:'/home/articles/content',
        element: <ArticleContent />
    },
    {
        path:'/admin',
        element: <Admin />,
        children:[
            {
                path:'/admin',
                element: <Navigate to="/admin/article" />
            },{
                path:'/admin/article',
                element:<Article/>
            },{
                path:'/admin/bulletin',
                element:<Bulletin/>
            },{
                path:'/admin/coment',
                element:<Coment/>
            }
        ]
    }
];
export default routes;
