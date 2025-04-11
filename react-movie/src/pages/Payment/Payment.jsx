import { useState } from 'react';
import { AlipayCircleFill, CheckCircleFill, LeftOutline, ClockCircleOutline,  } from 'antd-mobile-icons'
import style from './Payment.module.css';
import { Popup,  } from 'antd-mobile'
import ApplyInfo from '@/components/ApplyInfo/ApplyInfo';
import {useNavigate} from 'react-router-dom'


export default function Payment() {
    const [selectedPayment, setSelectedPayment] = useState('alipay');
    const [applyDialogStauts, setApplyDialogStatus] = useState(false)
    const navigate = useNavigate()

    const handleBack = () =>{
        navigate(-1)
    }


    const handleBuyTicket = () => {

        setApplyDialogStatus(true)
      
    }

    return (
        <div className={style.container}>
            {/* 头部 */}
            <div className={style.header}>

                <LeftOutline className={style.backIcon}  onClick={handleBack}/>
                <span>订单支付</span>
                <div className={style.paymentTimer}>
                    <ClockCircleOutline />
                    <span>支付剩余时间：14:59</span>
                </div>
            </div>

            {/* 订单信息 */}
            <div className={style.orderInfo}>
                <h2>电影票订单</h2>
                <div className={style.movieInfo}>
                    <div>奥本海默</div>
                    <div>万达影城（海淀店）· IMAX厅</div>
                    <div>10月20日 周五 18:30</div>
                    <div>4排5座 4排6座</div>
                </div>

                {/* 价格明细 */}
                <div className={style.priceDetails}>
                    <div className={style.priceItem}>
                        <span>票价</span>
                        <span>¥49.9 × 2</span>
                    </div>
                    <div className={style.priceItem}>
                        <span>服务费</span>
                        <span>¥4 × 2</span>
                    </div>
                    <div className={style.priceItem}>
                        <span>优惠券</span>
                        <span className={style.discount}>-¥10</span>
                    </div>
                </div>
            </div>

            {/* 支付方式 */}
            <div className={style.paymentMethods}>
                <h2>选择支付方式</h2>
                <div className={style.paymentOptions}>
                    <div
                        className={`${style.paymentOption} ${selectedPayment === 'alipay' ? style.selected : ''}`}
                        onClick={() => setSelectedPayment('alipay')}
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
                        className={`${style.paymentOption} ${selectedPayment === 'wechat' ? style.selected : ''}`}
                        onClick={() => setSelectedPayment('wechat')}
                    >
                        <div className={style.paymentLeft}>

                            <CheckCircleFill className={style.wechatIcon} />
                            <div>
                                <div>微信支付</div>
                                <div className={style.promotion}>满100减5元</div>
                            </div>
                        </div>
                        <div className={style.radio}></div>
                    </div>
                </div>
            </div>

            {/* 底部支付按钮 */}
            <div className={style.footer}>
                <div className={style.totalAmount}>
                    实付金额：<span className={style.amount}>¥97.8</span>
                </div>
                <button className={style.payButton} onClick={() => handleBuyTicket()}>立即支付</button>
            </div>

            <Popup
                visible={applyDialogStauts}
                onMaskClick={() => {
                    setApplyDialogStatus(false)
                }}
                onClose={()=> setApplyDialogStatus(false)}
                showCloseButton
                bodyStyle={{
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    minHeight: '60vh',
                  }}
            >
                <div
                    style={{ height: '40vh', overflowY: 'scroll', padding: '20px' }}
                >
         
                     <ApplyInfo applyDialogStauts={applyDialogStauts}/>
                </div>
            </Popup>
        </div>
    );
}
