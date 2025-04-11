import React from 'react';
import { SetOutline } from 'antd-mobile-icons';
import { Avatar, Badge } from 'antd-mobile';
import styles from './Person.module.css';

const Person = () => {
  return (
    <div className={styles.container}>
      {/* User Profile Section */}
      <div className={styles.profileHeader}>
        <div className={styles.userInfo}>
          <Avatar src="https://placekitten.com/100/100" className={styles.avatar} />
          <div className={styles.userDetails}>
            <div className={styles.nameWrapper}>
              <span className={styles.userName}>Sarah Johnson</span>
              <span className={styles.vipTag}>VIP 1</span>
            </div>
            <div className={styles.userId}>ID: 5876493</div>
            <button className={styles.editProfileBtn}>编辑个人资料</button>
          </div>
        </div>
        <div className={styles.settingsIcon}>
          <SetOutline fontSize={24} />
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
          <div className={styles.viewAll}>
            <span>全部订单</span>
            <span className={styles.rightArrow}>›</span>
          </div>
        </div>
        <div className={styles.orderTypes}>
          <div className={styles.orderType}>
            <div className={styles.orderTypeIcon}>
              <i className="iconfont icon-wallet" />
            </div>
            <span>待付款</span>
          </div>
          <div className={styles.orderType}>
            <div className={styles.orderTypeIcon}>
              <i className="iconfont icon-ticket" />
            </div>
            <span>待使用</span>
          </div>
          <div className={styles.orderType}>
            <div className={styles.orderTypeIcon}>
              <i className="iconfont icon-comment" />
            </div>
            <span>待评价</span>
          </div>
          <div className={styles.orderType}>
            <div className={styles.orderTypeIcon}>
              <i className="iconfont icon-service" />
            </div>
            <span>退款/售后</span>
          </div>
        </div>
      </div>

      {/* Feature Links */}
      <div className={styles.featureLinks}>
        <div className={styles.featureLink}>
          <div className={styles.featureLinkIcon} style={{ backgroundColor: '#FF5C5C' }}>
            <i className="iconfont icon-heart" />
          </div>
          <span className={styles.featureLinkText}>我的收藏</span>
          <span className={styles.rightArrow}>›</span>
        </div>
        
        <div className={styles.featureLink}>
          <div className={styles.featureLinkIcon} style={{ backgroundColor: '#FFA940' }}>
            <i className="iconfont icon-history" />
          </div>
          <span className={styles.featureLinkText}>观影历史</span>
          <span className={styles.rightArrow}>›</span>
        </div>
        
        <div className={styles.featureLink}>
          <div className={styles.featureLinkIcon} style={{ backgroundColor: '#4CD964' }}>
            <i className="iconfont icon-coupon" />
          </div>
          <span className={styles.featureLinkText}>优惠券</span>
          <Badge content="3张可用" className={styles.badge} />
          <span className={styles.rightArrow}>›</span>
        </div>
      </div>
    </div>
  );
};

export default Person;
