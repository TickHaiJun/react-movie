import { Result } from 'antd-mobile'
import { AlipayCircleFill, CheckCircleFill } from 'antd-mobile-icons'
import { useNavigate, useLocation } from 'react-router-dom';
import style from './ResultPage.module.css';

export default function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 从 location.state 获取订单信息
  const { success = true, orderId, amount, paymentMethod, eventTitle } = location.state || {};
  
  // 根据支付方式显示不同图标
  const getPaymentIcon = () => {
    switch(paymentMethod) {
      case 'ALIPAY':
        return <AlipayCircleFill style={{ fontSize: 48, color: '#1677FF' }} />;
      case 'WECHAT':
        return <CheckCircleFill style={{ fontSize: 48, color: '#07C160' }} />;
      case 'CREDIT_CARD':
        return <span style={{ fontSize: 48 }}>💳</span>;
      default:
        return <AlipayCircleFill style={{ fontSize: 48, color: '#1677FF' }} />;
    }
  };
  
  // 支付方式文本
  const getPaymentText = () => {
    switch(paymentMethod) {
      case 'ALIPAY': return '支付宝';
      case 'WECHAT': return '微信支付';
      case 'CREDIT_CARD': return '信用卡';
      default: return '未知';
    }
  };

  const details = [
    {
      label: '订单号',
      value: orderId || '未知',
    },
    {
      label: '活动名称',
      value: eventTitle || '未知活动',
      bold: true,
    },
    {
      label: '支付金额',
      value: `¥${amount || 0}`,
      bold: true,
    },
    {
      label: '支付方式',
      value: getPaymentText(),
    },
  ];

  const handleConfirm = () => {
    // 如果支付成功，跳转到首页；如果失败，返回支付页面
    if (success) {
      navigate('/', { replace: true });
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={style.container}>
      <Result
        status={success ? 'success' : 'error'}
        title={<div style={{ fontSize: 18 }}>{success ? '支付成功' : '支付失败'}</div>}
        description={
          success ? (
            <>
              <span style={{ fontSize: 24, color: '#333', marginRight: 4 }}>
                ¥
              </span>
              <span style={{ fontSize: 32, color: '#333' }}>{amount || 0}</span>
            </>
          ) : '请重新尝试支付'
        }
        icon={getPaymentIcon()}
      />
      
      {success && (
        <div className={style.details}>
          {details.map((item, index) => (
            <p key={index}>
              <span>{item.label}: </span>
              <span style={item.bold ? { fontWeight: 'bold' } : {}}>{item.value}</span>
            </p>
          ))}
        </div>
      )}
      
      <div className={style.buttonContainer}>
        <button className={style.confirmButton} onClick={handleConfirm}>
          {success ? '完成' : '重新支付'}
        </button>
      </div>
    </div>
  );
}