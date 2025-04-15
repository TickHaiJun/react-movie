import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContextWrapper';

// 权限路由组件，用于保护需要登录才能访问的页面
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // 如果用户未登录，重定向到登录页面，并记录原始访问路径
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // 用户已登录，正常显示受保护的路由内容
  return children;
};

export default PrivateRoute; 