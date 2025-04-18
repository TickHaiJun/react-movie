import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineHome, AiOutlineAppstore, AiOutlineStar, AiOutlineUser } from 'react-icons/ai';
import styles from './BottomBar.module.css';

const BottomBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Set active item based on current path
  const getActiveItemFromPath = (path) => {
    if (path === '/') return 'home';
    if (path === '/movie') return 'movie';
    if (path === '/concert') return 'concert';
    if (path === '/profile') return 'profile';
    return 'home';
  };

  const [activeItem, setActiveItem] = useState(getActiveItemFromPath(currentPath));

  const menuItems = [
    { id: 'home', label: '首页', icon: AiOutlineHome, path: '/' },
    { id: 'movie', label: '电影', icon: AiOutlineAppstore, path: '/movie' },
    { id: 'concert', label: '演唱会', icon: AiOutlineStar, path: '/concert' },
    { id: 'profile', label: '我的', icon: AiOutlineUser, path: '/profile' },
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
          <item.icon className={styles.icon} />
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default BottomBar;