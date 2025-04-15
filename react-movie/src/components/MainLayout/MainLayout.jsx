import { Outlet } from 'react-router-dom';
import BottomBar from '../BottomBar/BottomBar';
import styles from './MainLayout.module.css';

// 主布局组件，用于管理底部导航栏和路由出口
const MainLayout = ({ showBottomBar }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Outlet />
      </div>
      {showBottomBar && <BottomBar />}
    </div>
  );
};

export default MainLayout; 