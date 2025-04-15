import { useNavigate } from 'react-router-dom'
import styles from './CardItem.module.css'
import { Tag } from 'antd-mobile'
import { RightOutline, ClockCircleOutline, LocationFill } from 'antd-mobile-icons'

// type:  MOVIE | CONCERT

export default function CardItem({ title, type, items = [], onItemClick }) {
    const navigate = useNavigate()

    const handleToDetail = (id) => {
        if (onItemClick) {
            onItemClick(id)
        } else {
            navigate(`/detail?id=${id}`)
        }
    }

    const handleViewMore = () => {
        // 导航到分类列表页面
        if (type === 'MOVIE') {
            navigate('/?tab=MOVIE')
        } else if (type === 'CONCERT') {
            navigate('/?tab=CONCERT')
        }
    }

    // 如果没有数据，显示空状态
    if (!items || items.length === 0) {
        return (
            <div className={styles.cardContainer}>
                <div className={styles.headContainer}>
                    <div className={styles.headTitle}>
                        {title}
                    </div>
                </div>
                <div className={styles.emptyState}>
                    暂无数据
                </div>
            </div>
        )
    }

    return (
        <div className={styles.cardContainer}>
            <div className={styles.headContainer}>
                <div className={styles.headTitle}>
                    {title}
                </div>
                {/* <div className={styles.headMore} onClick={handleViewMore}>
                    全部 <RightOutline />
                </div> */}
            </div>
            <div className={styles.bodyContainer}>
                {type === 'MOVIE' && (
                    <div className={styles.movieContainer}>
                        {items.slice(0, 4).map((MOVIE) => (
                            <div 
                                key={MOVIE.id} 
                                className={styles.infoListItem} 
                                onClick={() => handleToDetail(MOVIE.id)}
                            >
                                <div className={styles.infoImgContainer}>
                                    <img
                                        src={MOVIE.backgroundImage || "https://via.placeholder.com/464x644"}
                                        alt={MOVIE.title}
                                    />
                                    <div className={styles.infoImgBottonContainer}>
                                        <span className={styles.cardName}>{MOVIE.title}</span>
                                        <span className={styles.cardScore}>{MOVIE.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {type === 'CONCERT' && (
                    <div className={styles.cinemaContainer}>
                        {items.slice(0, 2).map((CONCERT) => (
                            <div 
                                key={CONCERT.id} 
                                className={styles.cinemaItemContainer} 
                                onClick={() => handleToDetail(CONCERT.id)}
                            >
                                <div className={styles.cinemaItemLeftContainer}>
                                    <img 
                                        src={CONCERT.backgroundImage || "https://via.placeholder.com/120x160"} 
                                        alt={CONCERT.title} 
                                    />
                                </div>
                                <div className={styles.cinemaItemRightContainer}>
                                    <div className={styles.cinemaItemRightTitle}>
                                        {CONCERT.title}
                                    </div>
                                    <div className={styles.cinemaItemRightTime}>
                                        <ClockCircleOutline /> {CONCERT.time}
                                    </div>
                                    <div className={styles.cinemaItemRightTime}>
                                        <LocationFill /> {CONCERT.location}
                                    </div>
                                    <div className={styles.cinemaItemTagContainer}>
                                        <Tag color='warning'>今日可订</Tag>
                                        <Tag color='primary'>电子票</Tag>
                                        <span className={styles.priceTag}>¥{CONCERT.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}