import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MinimalLayout from '../layout/MinimalLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('../pages/authentication/Login')));
const RegisterBusiness = Loadable(lazy(() => import('../pages/RegisterBusiness/RegisterBusiness')));
const UserUI = Loadable(lazy(() => import('../pages/UserUI/UserUI')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'app',
            element: <AuthLogin />
        },
        {
            path: 'RegisterBusiness',
            element: <RegisterBusiness />
        },      
        {
            path: '/UserUI',
            element: <UserUI />
        },
    ]
};

export default LoginRoutes;
