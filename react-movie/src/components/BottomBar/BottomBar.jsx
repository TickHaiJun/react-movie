import{ useState } from 'react';
import styles from './BottomBar.module.css';

const BottomBar = () => {
  const [activeItem, setActiveItem] = useState('home');

  const menuItems = [
    { id: 'home', label: '首页', icon: '🏠' },
    { id: 'category', label: '分类', icon: '📑' },
    { id: 'favorite', label: '收藏', icon: '⭐' },
    { id: 'profile', label: '我的', icon: '👤' },
  ];

  return (
    <div className={styles.bottomBar}>
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`${styles.menuItem} ${activeItem === item.id ? styles.active : ''}`}
          onClick={() => setActiveItem(item.id)}
        >
          <span className={styles.icon}>{item.icon}</span>
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default BottomBar;