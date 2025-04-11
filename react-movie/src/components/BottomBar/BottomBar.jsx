import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './BottomBar.module.css';

const BottomBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Set active item based on current path
  const getActiveItemFromPath = (path) => {
    if (path === '/') return 'home';
    if (path === '/category') return 'category';
    if (path === '/favorite') return 'favorite';
    if (path === '/profile') return 'profile';
    return 'home';
  };

  const [activeItem, setActiveItem] = useState(getActiveItemFromPath(currentPath));

  const menuItems = [
    { id: 'home', label: '首页', iconClass: 'iconfont icon-home', path: '/' },
    { id: 'category', label: '分类', iconClass: 'iconfont icon-category', path: '/category' },
    { id: 'favorite', label: '收藏', iconClass: 'iconfont icon-star', path: '/favorite' },
    { id: 'profile', label: '我的', iconClass: 'iconfont icon-user', path: '/profile' },
  ];

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    navigate(item.path);
  };

  return (
    <div className={styles.bottomBar}>
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`${styles.menuItem} ${activeItem === item.id ? styles.active : ''}`}
          onClick={() => handleItemClick(item)}
        >
          <i className={`${styles.icon} ${item.iconClass}`}></i>
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default BottomBar;