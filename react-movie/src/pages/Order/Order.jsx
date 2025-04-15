import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLeft, AiOutlineDelete, AiOutlineComment, AiTwotoneSchedule } from 'react-icons/ai';
import { Modal, Toast } from 'antd-mobile';
import styles from './Order.module.css';
import { useAuth } from '../../context/AuthContextWrapper';
import { orderService, eventService } from '../../services/api';

const Order = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [events, setEvents] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, [currentUser]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const userOrders = await orderService.getUserOrders();
      setOrders(userOrders);
      
      // 获取订单相关的活动信息
      const eventIds = [...new Set(userOrders.map(order => order.eventId))];
      const eventDetails = {};
      
      await Promise.all(
        eventIds.map(async (eventId) => {
          try {
            const eventData = await eventService.getEvent(eventId);
            eventDetails[eventId] = eventData;
          } catch (error) {
            console.error(`获取活动 ${eventId} 详情失败:`, error);
          }
        })
      );
      
      setEvents(eventDetails);
    } catch (error) {
      console.error('获取订单列表失败:', error);
      Toast.show({
        content: '获取订单失败，请稍后再试',
        position: 'bottom',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId) => {
    Modal.confirm({
      content: '确定要删除该订单吗？',
      onConfirm: async () => {
        try {
          await orderService.deleteOrder(orderId);
          // 移除已删除的订单
          setOrders(orders.filter(order => order.id !== orderId));
          Toast.show({
            content: '订单已删除',
            position: 'bottom',
          });
        } catch (error) {
          console.error('删除订单失败:', error);
          Toast.show({
            content: '删除失败，请稍后再试',
            position: 'bottom',
          });
        }
      },
    });
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, { status: newStatus });
      // 更新本地订单状态
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      Toast.show({
        content: '订单状态已更新',
        position: 'bottom',
      });
    } catch (error) {
      console.error('更新订单状态失败:', error);
      Toast.show({
        content: '更新失败，请稍后再试',
        position: 'bottom',
      });
    }
  };

  const handleEvaluate = (orderId) => {
    // 跳转到评价页面，或者弹出评价弹窗
    Modal.alert({
      content: '评价功能暂未开放',
      confirmText: '我知道了',
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  // 根据标签筛选订单
  const getFilteredOrders = () => {
    if (activeTab === 'all') return orders;
    
    const statusMap = {
      'pending': 'PENDING',
      'paid': 'PAID',
      'completed': 'COMPLETED',
    };
    
    return orders.filter(order => order.status === statusMap[activeTab]);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // 获取订单关联的活动信息
  const getEventDetails = (eventId) => {
    return events[eventId] || {};
  };

  const filteredOrders = getFilteredOrders();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.backButton} onClick={goBack}>
          <AiOutlineLeft />
        </div>
        <h1 className={styles.title}>我的订单</h1>
      </div>

      <div className={styles.tabs}>
        <div 
          className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
          onClick={() => handleTabClick('all')}
        >
          全部
        </div>
        <div 
          className={`${styles.tab} ${activeTab === 'pending' ? styles.active : ''}`}
          onClick={() => handleTabClick('pending')}
        >
          待付款
        </div>
        <div 
          className={`${styles.tab} ${activeTab === 'paid' ? styles.active : ''}`}
          onClick={() => handleTabClick('paid')}
        >
          待使用
        </div>
        <div 
          className={`${styles.tab} ${activeTab === 'completed' ? styles.active : ''}`}
          onClick={() => handleTabClick('completed')}
        >
          已完成
        </div>
      </div>

      {loading ? (
        <div className={styles.loading}>加载中...</div>
      ) : filteredOrders.length === 0 ? (
        <div className={styles.emptyState}>
          <p>暂无订单</p>
        </div>
      ) : (
        <div className={styles.orderList}>
          {filteredOrders.map(order => {
            const eventDetail = getEventDetails(order.eventId);
            return (
              <div key={order.id} className={styles.orderItem}>
                <div className={styles.orderType}>
                  <AiTwotoneSchedule /> {eventDetail.type || '活动'}
                </div>
                <div className={styles.orderContent}>
                  <div className={styles.orderImage}>
                    <img src={eventDetail.backgroundImage || 'https://via.placeholder.com/120x160'} alt={eventDetail.title} />
                  </div>
                  <div className={styles.orderDetails}>
                    <h3 className={styles.orderTitle}>{eventDetail.title || '未知活动'}</h3>
                    <p className={styles.orderVenue}>{eventDetail.location || '未知地点'}</p>
                    <p className={styles.orderDate}>{eventDetail.time || '未知时间'}</p>
                    <p className={styles.orderFormat}>支付方式: {order.paymentMethod}</p>
                    <p className={styles.orderStatus}>状态: {order.status}</p>
                  </div>
                </div>
                <div className={styles.orderFooter}>
                  <div className={styles.orderPrice}>总价：¥{eventDetail.price ? eventDetail.price.toFixed(1) : '?'}</div>
                  <div className={styles.orderActions}>
                    <button 
                      className={styles.actionButton}
                      onClick={() => deleteOrder(order.id)}
                    >
                      <AiOutlineDelete />
                      <span>删除订单</span>
                    </button>
                    {order.status === 'COMPLETED' && (
                      <button 
                        className={styles.actionButton}
                        onClick={() => handleEvaluate(order.id)}
                      >
                        <AiOutlineComment />
                        <span>立即评价</span>
                      </button>
                    )}
                    {order.status === 'PENDING' && (
                      <button 
                        className={`${styles.actionButton} ${styles.primaryButton}`}
                        onClick={() => navigate(`/payment?orderId=${order.id}`)}
                      >
                        <span>去支付</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Order;
