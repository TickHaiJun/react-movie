import { useState, useEffect } from 'react';
import { AlipayCircleFill, CheckCircleFill, LeftOutline, ClockCircleOutline } from 'antd-mobile-icons'
import style from './Payment.module.css';
import { Popup, Toast, PasscodeInput, NumberKeyboard } from 'antd-mobile'
import ApplyInfo from '../../components/ApplyInfo/ApplyInfo';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContextWrapper';
import { orderService, eventService } from '../../services/api';

export default function Payment() {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId');
    const eventId = searchParams.get('eventId');
    
    const [selectedPayment, setSelectedPayment] = useState('ALIPAY');
    const [applyDialogStauts, setApplyDialogStatus] = useState(false);
    const [timeLeft, setTimeLeft] = useState(900); // 15分钟倒计时
    const [eventDetails, setEventDetails] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [password, setPassword] = useState('');
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useAuth();

    // 获取活动详情或订单详情
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                if (orderId) {
                    // 编辑现有订单
                    const order = await orderService.getOrder(orderId);
                    setOrderDetails(order);
                    
                    // 获取订单关联的活动信息
                    const event = await eventService.getEvent(order.eventId);
                    setEventDetails(event);
                    setSelectedPayment(order.paymentMethod);
                } else if (eventId) {
                    // 创建新订单
                    const event = await eventService.getEvent(eventId);
                    setEventDetails(event);
                } else {
                    Toast.show({
                        content: '缺少必要参数',
                        position: 'bottom',
                    });
                    navigate(-1);
                }
            } catch (error) {
                console.error('获取数据失败:', error);
                Toast.show({
                    content: '获取数据失败，请稍后再试',
                    position: 'bottom',
                });
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [orderId, eventId]);

    // 支付倒计时
    useEffect(() => {
        if (timeLeft <= 0) return;
        
        const timerId = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        
        return () => clearInterval(timerId);
    }, [timeLeft]);

    // 格式化倒计时
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleBack = () => {
        navigate(-1);
    };

    // 处理支付密码验证成功后的操作
    const handleProcessPayment = async () => {
        try {
            setLoading(true);
            let finalOrderId = orderId;
            
            if (!orderId && eventId) {
                // 创建新订单
                const newOrder = await orderService.createOrder({
                    eventId,
                    paymentMethod: selectedPayment,
                    userId: currentUser?.id
                });
                
                finalOrderId = newOrder.id;
            }
            
            // 更新订单状态为已支付
            await orderService.updateOrderStatus(finalOrderId, {
                status: 'PAID'
            });
            
            // 关闭支付弹窗
            setApplyDialogStatus(false);
            
            // 跳转到结果页面
            navigate('/resultPage', { 
                state: { 
                    success: true, 
                    orderId: finalOrderId,
                    amount: eventDetails?.price,
                    paymentMethod: selectedPayment,
                    eventTitle: eventDetails?.title
                } 
            });
        } catch (error) {
            console.error('支付处理失败:', error);
            Toast.show({
                content: '支付失败，请稍后再试',
                position: 'bottom',
            });
            
            // 跳转到失败结果页面
            navigate('/resultPage', { 
                state: { 
                    success: false,
                    orderId,
                    amount: eventDetails?.price,
                    paymentMethod: selectedPayment,
                    eventTitle: eventDetails?.title
                } 
            });
        } finally {
            setLoading(false);
        }
    };

    const handleBuyTicket = () => {
        setApplyDialogStatus(true);
    };

    return (
        <div className={style.container}>
            {/* 头部 */}
            <div className={style.header}>
                <LeftOutline className={style.backIcon} onClick={handleBack} />
                <span>订单支付</span>
                <div className={style.paymentTimer}>
                    <ClockCircleOutline />
                    <span>支付剩余时间：{formatTime(timeLeft)}</span>
                </div>
            </div>

            {/* 订单信息 */}
            <div className={style.orderInfo}>
                <h2>{eventDetails?.type || '活动'}订单</h2>
                <div className={style.movieInfo}>
                    <div>{eventDetails?.title || '未知活动'}</div>
                    <div>{eventDetails?.location || '未知地点'}</div>
                    <div>{eventDetails?.time || '未知时间'}</div>
                </div>

                {/* 价格明细 */}
                <div className={style.priceDetails}>
                    <div className={style.priceItem}>
                        <span>票价</span>
                        <span>¥{eventDetails?.price || 0}</span>
                    </div>
                    <div className={style.priceItem}>
                        <span>服务费</span>
                        <span>¥0</span>
                    </div>
                </div>
            </div>

            {/* 支付方式 */}
            <div className={style.paymentMethods}>
                <h2>选择支付方式</h2>
                <div className={style.paymentOptions}>
                    <div
                        className={`${style.paymentOption} ${selectedPayment === 'ALIPAY' ? style.selected : ''}`}
                        onClick={() => setSelectedPayment('ALIPAY')}
                    >
                        <div className={style.paymentLeft}>
                            <AlipayCircleFill className={style.alipayIcon} />
                            <div>
                                <div>支付宝</div>
                                <div className={style.promotion}>单笔满30元随机立减</div>
                            </div>
                        </div>
                        <div className={style.radio}></div>
                    </div>

                    <div
                        className={`${style.paymentOption} ${selectedPayment === 'WECHAT' ? style.selected : ''}`}
                        onClick={() => setSelectedPayment('WECHAT')}
                    >
                        <div className={style.paymentLeft}>
                            {/* <WechatOutline  /> */}
                            <CheckCircleFill className={style.wechatIcon}/>
                            <div>
                                <div>微信支付</div>
                                <div className={style.promotion}>满100减5元</div>
                            </div>
                        </div>
                        <div className={style.radio}></div>
                    </div>
                    
                    <div
                        className={`${style.paymentOption} ${selectedPayment === 'CREDIT_CARD' ? style.selected : ''}`}
                        onClick={() => setSelectedPayment('CREDIT_CARD')}
                    >
                        <div className={style.paymentLeft}>
                            <div className={style.creditCardIcon}>💳</div>
                            <div>
                                <div>信用卡</div>
                                <div className={style.promotion}>首次支付立减10元</div>
                            </div>
                        </div>
                        <div className={style.radio}></div>
                    </div>
                </div>
            </div>

            {/* 底部支付按钮 */}
            <div className={style.footer}>
                <div className={style.totalAmount}>
                    实付金额：<span className={style.amount}>¥{eventDetails?.price || 0}</span>
                </div>
                <button className={style.payButton} onClick={handleBuyTicket}>立即支付</button>
            </div>

            <Popup
                visible={applyDialogStauts}
                onMaskClick={() => {
                    setApplyDialogStatus(false);
                }}
                onClose={() => setApplyDialogStatus(false)}
                showCloseButton
                bodyStyle={{
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    minHeight: '60vh',
                }}
            >
                <div style={{ height: '40vh', overflowY: 'scroll', padding: '20px' }}>
                    <ApplyInfo 
                        applyDialogStauts={applyDialogStauts} 
                        onConfirm={handleProcessPayment}
                        paymentMethod={selectedPayment}
                        eventDetails={eventDetails}
                    />
                </div>
            </Popup>
        </div>
    );
}
