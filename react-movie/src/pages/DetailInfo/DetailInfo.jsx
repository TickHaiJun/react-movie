import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import { LeftOutline, StarFill, LocationFill } from 'antd-mobile-icons';
import style from './DetailInfo.module.css';
import { eventService } from '../../services/api';
import { useAuth } from '../../context/AuthContextWrapper';

export default function DetailInfo() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    const eventId = new URLSearchParams(location.search).get('id');
    
    const [eventDetails, setEventDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(0);
    const [selectedTime, setSelectedTime] = useState(null);
    
    useEffect(() => {
        if (!eventId) {
            Toast.show({
                content: '缺少活动ID',
                position: 'bottom',
            });
            navigate('/');
            return;
        }
        
        fetchEventDetails();
    }, [eventId]);
    
    const fetchEventDetails = async () => {
        try {
            setLoading(true);
            const data = await eventService.getEvent(eventId);
            setEventDetails(data);
        } catch (error) {
            console.error('获取活动详情失败:', error);
            Toast.show({
                content: '获取活动详情失败',
                position: 'bottom',
            });
        } finally {
            setLoading(false);
        }
    };
    
    const handleGoBack = () => {
        navigate(-1);
    };
    
    const handleDateSelect = (index) => {
        setSelectedDate(index);
    };
    
    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };
    
    const handleToBuyTicket = () => {
        if (!isAuthenticated()) {
            Toast.show({
                content: '请先登录',
                position: 'bottom',
            });
            navigate('/login', { state: { from: location.pathname + location.search } });
            return;
        }
        
        navigate(`/payment?eventId=${eventId}`);
    };
    
    // 生成日期数据
    const generateDateList = () => {
        const dateList = [];
        const today = new Date();
        
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            
            const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
            const dayName = i === 0 ? '今天' : i === 1 ? '明天' : dayNames[date.getDay()];
            
            dateList.push({
                dayName,
                date: `${date.getMonth() + 1}/${date.getDate()}`
            });
        }
        
        return dateList;
    };
    
    const dateList = generateDateList();
    
    // 生成场次数据
    const generateTimeList = () => {
        return [
            { time: '10:30', format: '原版', price: eventDetails?.price || 0 },
            { time: '13:15', format: 'IMAX', price: (eventDetails?.price || 0) + 20 },
            { time: '15:50', format: '原版', price: eventDetails?.price || 0 },
            { time: '18:20', format: 'IMAX', price: (eventDetails?.price || 0) + 20 },
            { time: '21:00', format: '原版', price: (eventDetails?.price || 0) - 10 },
        ];
    };
    
    const timeList = generateTimeList();
    
    if (loading) {
        return <div className={style.loading}>加载中...</div>;
    }
    
    if (!eventDetails) {
        return <div className={style.error}>活动不存在或已下架</div>;
    }
    
    return (
        <div className={style.container}>
            {/* 返回按钮 */}
            {/* <div className={style.backButton} onClick={handleGoBack}>
              
            </div> */}
            
            {/* 背景图片区域 */}
            <div className={style.bgContainer}>
            <LeftOutline color='var(--adm-color-primary)' onClick={handleGoBack}  fontSize={36} />
                <div 
                    className={style.bgImage}
                    style={{ backgroundImage: `url(${eventDetails.backgroundImage || 'https://via.placeholder.com/500x300'})` }}
                ></div>
                <div className={style.mask}></div>
            </div>

            {/* 活动信息区域 */}
            <div className={style.movieInfo}>
                <div 
                    className={style.poster}
                    style={{ backgroundImage: `url(${eventDetails.backgroundImage || 'https://via.placeholder.com/180x240'})` }}
                ></div>
                <div className={style.info}>
                    <h1>{eventDetails.title}</h1>
                    <div className={style.rating}>
                        <span className={style.score}><StarFill /> 9.2</span>
                        <span className={style.count}>123.4万人评</span>
                    </div>
                    <div className={style.tags}>
                        <span>{eventDetails.type}</span>
                    </div>
                    <div className={style.meta}>
                        <LocationFill /> {eventDetails.location}
                    </div>
                    <div className={style.time}>
                        场次：{eventDetails.time}
                    </div>
                </div>
            </div>

            {/* 日期选择区域 */}
            <div className={style.dateSelect}>
                {dateList.map((item, index) => (
                    <div 
                        key={index}
                        className={`${style.dateItem} ${selectedDate === index ? style.active : ''}`}
                        onClick={() => handleDateSelect(index)}
                    >
                        <div>{item.dayName}</div>
                        <div>{item.date}</div>
                    </div>
                ))}
            </div>

            {/* 场馆选择区域 */}
            <div className={style.cinemaSelect}>
                <h2>场次选择</h2>
                <div className={style.cinemaItem}>
                    <div className={style.cinemaInfo}>
                        <h3>{eventDetails.location}</h3>
                        <p>地址：{eventDetails.location}</p>
                        <span className={style.discount}>退票低至7折</span>
                    </div>
                    <div className={style.showTimes}>
                        {timeList.map((item, index) => (
                            <div 
                                key={index}
                                className={`${style.timeItem} ${selectedTime === index ? style.activeTime : ''}`}
                                onClick={() => handleTimeSelect(index)}
                            >
                                <div>{item.time}</div>
                                <div>{item.format}</div>
                                <div className={style.price}>¥{item.price}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 底部购票按钮 */}
            <div className={style.buyTicket}>
                <div className={style.discount}>价格：¥{eventDetails.price}</div>
                <button className={style.buyButton} onClick={handleToBuyTicket}>立即购票</button>
            </div>
        </div>
    );
}