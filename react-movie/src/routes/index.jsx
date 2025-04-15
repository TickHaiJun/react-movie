import { createBrowserRouter } from 'react-router-dom';
import DetailInfo from '../pages/DetailInfo/DetailInfo';
import Payment from '../pages/Payment/Payment';
import Index from '../pages/Index/Index';
import ResultPage from '../pages/ResultPage/ResultPage';
import Person from '../pages/Person/Person';
import Order from '../pages/Order/Order';
import Login from '../pages/Login/Login';
import Search from '../pages/Search/Search';
import Movie from '../pages/Movie/Movie';
import Concert from '../pages/Concert/Concert';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import MainLayout from '../components/MainLayout/MainLayout';

// 创建路由配置
const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout showBottomBar={true} />,
        children: [
            {
                index: true,
                element: <Index />,
            }
        ]
    },
    {
        path: '/detail',
        element: <MainLayout showBottomBar={false} />,
        children: [
            {
                index: true,
                element: <DetailInfo />,
            }
        ]
    },
    {
        path: '/payment',
        element: <MainLayout showBottomBar={false} />,
        children: [
            {
                index: true,
                element: (
                    <PrivateRoute>
                        <Payment />
                    </PrivateRoute>
                ),
            }
        ]
    },
    {
        path: '/resultPage',
        element: <MainLayout showBottomBar={false} />,
        children: [
            {
                index: true,
                element: (
                    <PrivateRoute>
                        <ResultPage />
                    </PrivateRoute>
                ),
            }
        ]
    },
    {
        path: '/profile',
        element: <MainLayout showBottomBar={true} />,
        children: [
            {
                index: true,
                element: <Person />,
            }
        ]
    },
    {
        path: '/order',
        element: <MainLayout showBottomBar={true} />,
        children: [
            {
                index: true,
                element: (
                    <PrivateRoute>
                        <Order />
                    </PrivateRoute>
                ),
            }
        ]
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/search',
        element: <MainLayout showBottomBar={false} />,
        children: [
            {
                index: true,
                element: <Search />,
            }
        ]
    },
    {
        path: '/movie',
        element: <MainLayout showBottomBar={true} />,
        children: [
            {
                index: true,
                element: <Movie />,
            }
        ]
    },
    {
        path: '/concert',
        element: <MainLayout showBottomBar={true} />,
        children: [
            {
                index: true,
                element: <Concert />,
            }
        ]
    },
]);

export default router;