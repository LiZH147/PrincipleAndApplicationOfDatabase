import React from 'react';
import { Navigate } from 'react-router-dom';

const Articles = React.lazy(() => import('../pages/home/articles/index'));
const Albums = React.lazy(() => import('../pages/home/albums'));
const Personal = React.lazy(() => import('../pages/home/personal'));
const Login = React.lazy(() => import('../pages/login'));
const Home = React.lazy(() => import('../pages/home'));
const Register = React.lazy(() => import('../pages/register'));
const ArticleContent = React.lazy(() => import('../pages/home/articles/articleContent'))

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
            }
        ]
    },
    {
        path:'/home/articles/content',
        element: <ArticleContent />
    }
];
export default routes;
