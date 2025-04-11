import { createBrowserRouter } from 'react-router-dom';
import DetailInfo from '../pages/DetailInfo/DetailInfo';
import Payment from '../pages/Payment/Payment';
import Index from '@/pages/Index/Index';
import ResultPage from '@/pages/ResultPage/ResultPage';
import Person from '@/pages/Person/Person';
import Order from '@/pages/Order/Order';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Index />,
    },
    {
        path: '/detail',
        element: <DetailInfo />,
    },
    {
        path: '/payment',
        element: <Payment />,
    },
    {
        path: '/resultPage',
        element: <ResultPage />,
    },
    {
        path: '/profile',
        element: <Person />,
    },
    {
        path: '/order',
        element: <Order />,
    },
]);

export default router;