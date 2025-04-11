import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLeft, AiOutlineDelete, AiOutlineComment,AiTwotoneSchedule   } from 'react-icons/ai';
import styles from './Order.module.css';
import BottomBar from '../../components/BottomBar/BottomBar';

const Order = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const orders = [
    {
      id: 1,
      type: '电影票',
      title: '奥本海默',
      venue: '万达影城（海淀店）',
      date: '2023年10月15日 19:30',
      seats: '4排8号座',
      format: 'IMAX 2D',
      price: 97.8,
      status: '已使用',
      image: 'https://img1.baidu.com/it/u=3218705295,3469843867&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=626'
    },
    {
      id: 2,
      type: '展览',
      title: '北京】范玮琪「我们之间的事」演唱会 -北京站',
      venue: '北京·今日美术馆',
      date: '2025年9月25日 10:30',
      count: '成人票 1张',
      price: 198,
      status: '已使用',
      image: 'https://img.alicdn.com/bao/uploaded/i2/2251059038/O1CN01vNhv1H2GdSgnGgMkP_!!4611686018427383646-0-item_pic.jpg_q60.jpg_.webp'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.backButton} onClick={goBack}>
          <AiOutlineLeft />
        </div>
        <h1 className={styles.title}>我的订单</h1>
      </div>

      <div className={styles.tabs}>
        <div className={`${styles.tab} ${styles.active}`}>全部</div>
        <div className={styles.tab}>待付款</div>
        <div className={styles.tab}>待使用</div>
        <div className={styles.tab}>待评价</div>
      </div>

      <div className={styles.orderList}>
        {orders.map(order => (
          <div key={order.id} className={styles.orderItem}>
            <div className={styles.orderType}> <AiTwotoneSchedule  />  {order.type}</div>
            <div className={styles.orderContent}>
              <div className={styles.orderImage}>
                <img src={order.image} alt={order.title} />
              </div>
              <div className={styles.orderDetails}>
                <h3 className={styles.orderTitle}>{order.title}</h3>
                <p className={styles.orderVenue}>{order.venue}</p>
                <p className={styles.orderDate}>{order.date}</p>
                {order.seats && <p className={styles.orderSeats}>{order.seats}</p>}
                {order.count && <p className={styles.orderCount}>{order.count}</p>}
                {order.format && <p className={styles.orderFormat}>{order.format}</p>}
              </div>
            </div>
            <div className={styles.orderFooter}>
              <div className={styles.orderStatus}>{order.status}</div>
              <div className={styles.orderPrice}>总价：¥{order.price.toFixed(1)}</div>
              <div className={styles.orderActions}>
                <button className={styles.actionButton}>
                  <AiOutlineDelete />
                  <span>删除订单</span>
                </button>
                <button className={styles.actionButton}>
                  <AiOutlineComment />
                  <span>立即评价</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <BottomBar />
    </div>
  );
};

export default Order;
