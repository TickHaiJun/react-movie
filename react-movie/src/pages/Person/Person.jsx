import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Badge, Modal, Toast, Button } from 'antd-mobile';
import { AiOutlineSetting, AiOutlineHeart, AiOutlineHistory, AiOutlineGift, AiOutlineWallet, AiOutlineComment, AiOutlineCustomerService, AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
import styles from './Person.module.css';
import { useAuth } from '../../context/AuthContextWrapper';
import { userService } from '../../services/api';

const Person = () => {
  const navigate = useNavigate();
  const { currentUser, logout, isAuthenticated } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editForm, setEditForm] = useState({
    nickname: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  // 获取用户数据
  useEffect(() => {
    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

  const fetchUserData = async () => {
    try {
      // 假设我们已有用户ID
      const userId = currentUser.id;
      const userData = await userService.getUser(userId);
      setUserData(userData);
      
      // 初始化编辑表单数据
      setEditForm({
        nickname: userData.nickname || '',
        email: userData.email || '',
      });
    } catch (error) {
      console.error('获取用户数据失败:', error);
      // 使用当前用户作为备用
      setUserData(currentUser);
    }
  };

  const goToOrders = () => {
    if (!isAuthenticated()) {
      redirectToLogin();
      return;
    }
    navigate('/order');
  };

  const redirectToLogin = () => {
    navigate('/login', { state: { from: '/profile' } });
  };

  const handleLogout = () => {
    Modal.confirm({
      content: '确定要退出登录吗？',
      onConfirm: () => {
        logout();
      },
    });
  };

  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleEditSubmit = async () => {
    if (!editForm.nickname || !editForm.email) {
      Toast.show({
        content: '昵称和邮箱不能为空',
        position: 'bottom',
      });
      return;
    }

    try {
      setLoading(true);
      await userService.updateUser(currentUser.id, {
        nickname: editForm.nickname,
        email: editForm.email,
      });

      // 刷新用户数据
      await fetchUserData();
      setIsEditModalVisible(false);
      Toast.show({
        content: '个人信息更新成功',
        position: 'bottom',
      });
    } catch (error) {
      console.error('更新用户信息失败:', error);
      Toast.show({
        content: '更新失败，请稍后再试',
        position: 'bottom',
      });
    } finally {
      setLoading(false);
    }
  };

  // 渲染未登录状态的页面
  if (!isAuthenticated()) {
    return (
      <div className={styles.notLoginContainer}>
        <div className={styles.notLoginContent}>
          <div className={styles.avatarPlaceholder}>
            <AiOutlineUser size={70} />
          </div>
          <h2 className={styles.loginTitle}>登录账户，体验更多功能</h2>
          <p className={styles.loginDesc}>登录后可查看订单、收藏喜欢的活动、参与评价等</p>
          <Button 
            className={styles.loginButton}
            onClick={redirectToLogin}
            color='primary'
            block
            size='large'
          >
            立即登录
          </Button>
        </div>
        
        <div className={styles.featureLinks}>
          <div className={styles.featureLink} onClick={redirectToLogin}>
            <div className={styles.featureLinkIcon} style={{ backgroundColor: '#FF5C5C' }}>
              <AiOutlineHeart />
            </div>
            <span className={styles.featureLinkText}>我的收藏</span>
            <span className={styles.rightArrow}>›</span>
          </div>
          
          <div className={styles.featureLink} onClick={redirectToLogin}>
            <div className={styles.featureLinkIcon} style={{ backgroundColor: '#FFA940' }}>
              <AiOutlineHistory />
            </div>
            <span className={styles.featureLinkText}>观影历史</span>
            <span className={styles.rightArrow}>›</span>
          </div>
          
          <div className={styles.featureLink} onClick={redirectToLogin}>
            <div className={styles.featureLinkIcon} style={{ backgroundColor: '#4CD964' }}>
              <AiOutlineGift />
            </div>
            <span className={styles.featureLinkText}>优惠券</span>
            <span className={styles.rightArrow}>›</span>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.container}>
      {/* User Profile Section */}
      <div className={styles.profileHeader}>
        <div className={styles.userInfo}>
          <Avatar src="https://placekitten.com/100/100" className={styles.avatar} />
          <div className={styles.userDetails}>
            <div className={styles.nameWrapper}>
              <span className={styles.userName}>{userData?.nickname || currentUser?.username || '用户'}</span>
              <span className={styles.vipTag}>VIP 1</span>
            </div>
            <div className={styles.userId}>ID: {userData?.id || currentUser?.id || '未知'}</div>
            <button className={styles.editProfileBtn} onClick={showEditModal}>编辑个人资料</button>
          </div>
        </div>
        <div className={styles.settingsIcon} onClick={handleLogout}>
          <AiOutlineLogout fontSize={24} />
        </div>
      </div>

      {/* Membership Section */}
      <div className={styles.membershipCard}>
        <div className={styles.membershipInfo}>
          <span className={styles.crownIcon}>👑</span>
          <span className={styles.membershipText}>影城会员</span>
        </div>
        <div className={styles.membershipBenefits}>
          每月免费观影1次，积分可兑换优惠券
        </div>
      </div>

      {/* Orders Section */}
      <div className={styles.ordersCard}>
        <div className={styles.ordersHeader}>
          <span>我的订单</span>
          <div className={styles.viewAll} onClick={goToOrders}>
            <span>全部订单</span>
            <span className={styles.rightArrow}>›</span>
          </div>
        </div>
        <div className={styles.orderTypes}>
          <div className={styles.orderType} onClick={goToOrders}>
            <div className={styles.orderTypeIcon}>
              <AiOutlineWallet />
            </div>
            <span>待付款</span>
          </div>
          <div className={styles.orderType} onClick={goToOrders}>
            <div className={styles.orderTypeIcon}>
              {/* 待使用图标 */}
            </div>
            <span>待使用</span>
          </div>
          <div className={styles.orderType} onClick={goToOrders}>
            <div className={styles.orderTypeIcon}>
              <AiOutlineComment />
            </div>
            <span>待评价</span>
          </div>
          <div className={styles.orderType} onClick={goToOrders}>
            <div className={styles.orderTypeIcon}>
              <AiOutlineCustomerService />
            </div>
            <span>退款/售后</span>
          </div>
        </div>
      </div>

      {/* Feature Links */}
      <div className={styles.featureLinks}>
        <div className={styles.featureLink}>
          <div className={styles.featureLinkIcon} style={{ backgroundColor: '#FF5C5C' }}>
            <AiOutlineHeart />
          </div>
          <span className={styles.featureLinkText}>我的收藏</span>
          <span className={styles.rightArrow}>›</span>
        </div>
        
        <div className={styles.featureLink}>
          <div className={styles.featureLinkIcon} style={{ backgroundColor: '#FFA940' }}>
            <AiOutlineHistory />
          </div>
          <span className={styles.featureLinkText}>观影历史</span>
          <span className={styles.rightArrow}>›</span>
        </div>
        
        <div className={styles.featureLink}>
          <div className={styles.featureLinkIcon} style={{ backgroundColor: '#4CD964' }}>
            <AiOutlineGift />
          </div>
          <span className={styles.featureLinkText}>优惠券</span>
          <Badge content="3张可用" className={styles.badge} />
          <span className={styles.rightArrow}>›</span>
        </div>
      </div>

      {/* 编辑个人信息弹窗 */}
      <Modal
        visible={isEditModalVisible}
        content={(
          <div className={styles.modalContent}>
            <h3>编辑个人资料</h3>
            <div className={styles.formGroup}>
              <label htmlFor="nickname">昵称</label>
              <input
                type="text"
                name="nickname"
                value={editForm.nickname}
                onChange={handleEditChange}
                placeholder="请输入昵称"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">邮箱</label>
              <input
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                placeholder="请输入邮箱"
              />
            </div>
          </div>
        )}
        closeOnAction
        onClose={() => setIsEditModalVisible(false)}
        actions={[
          {
            key: 'cancel',
            text: '取消',
          },
          {
            key: 'submit',
            text: loading ? '提交中...' : '提交',
            bold: true,
            disabled: loading,
            onClick: handleEditSubmit,
          },
        ]}
      />
    </div>
  );
};

export default Person;
