
import { useState } from 'react'
import styles from './CardItem.module.css'
import { Tag, Space } from 'antd-mobile'
import { RightOutline, ClockCircleOutline, LocationFill, } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'

// type:  movie | cinema

export default function CardItem({ title, type }) {
    const navigate = useNavigate()

    const handleToDetail = () => {
        console.log("进入详情页")
        navigate('/detail')
    }
    return (
        <div className={styles.cardContainer}>
            <div className={styles.headContainer}>
                <div className={styles.headTitle}>
                    {title}
                </div>
                 <div className={styles.headMore}>
                    全部 <RightOutline />
                </div>
            </div>
            <div className={styles.bodyContainer}>
                {type === 'movie' ? (
                    <div className={styles.movieContainer}>
                        <div className={styles.infoListItem} onClick={handleToDetail}>
                            <div className={styles.infoImgContainer}>
                                <img
                                    src="https://p0.pipi.cn/mediaplus/friday_image_fe/0fa3343d3d69a1c7357048b07443f06cd4f3e.jpg?imageView2/1/w/464/h/644"
                                    alt=""
                                />
                                <div className={styles.infoImgBottonContainer}>
                                    <span className={styles.cardName}>向阳花</span>
                                    <span className={styles.cardScore}>9.4</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}

                {type === 'cinema' ? (
                    <div className={styles.cinemaContainer}>
                        <div className={styles.cinemaItemContainer} onClick={handleToDetail}>
                            <div className={styles.cinemaItemLeftContainer}>
                                <img src="https://img.alicdn.com/bao/uploaded/https://img.alicdn.com/imgextra/i2/2251059038/O1CN01BhgEtO2GdSgoESael_!!2251059038.jpg" alt="" />
                            </div>
                            <div className={styles.cinemaItemRightContainer}>
                                <div className={styles.cinemaItemRightTitle}>
                                    2025 张学友演唱会
                                </div>
                                <div className={styles.cinemaItemRightTime}>
                                    <ClockCircleOutline /> 2025.4.11 周五 19:30
                                </div>

                                <div className={styles.cinemaItemRightTime}>
                                    <LocationFill /> 上海 * 上海体育场
                                </div>
                                <div className={styles.cinemaItemTagContainer}>
                                    <Tag color='warning'>今日可订</Tag>
                                    <Tag color='primary'>电子票</Tag>
                                </div>
                            </div>
                        </div>
                        <div className={styles.cinemaItemContainer}>
                            <div className={styles.cinemaItemLeftContainer}>
                                <img src="https://img.alicdn.com/bao/uploaded/https://img.alicdn.com/imgextra/i2/2251059038/O1CN01BhgEtO2GdSgoESael_!!2251059038.jpg" alt="" />
                            </div>
                            <div className={styles.cinemaItemRightContainer}>
                                <div className={styles.cinemaItemRightTitle}>
                                    2025 张学友演唱会
                                </div>
                                <div className={styles.cinemaItemRightTime}>
                                    <ClockCircleOutline /> 2025.4.11 周五 19:30
                                </div>

                                <div className={styles.cinemaItemRightTime}>
                                    <LocationFill /> 上海 * 上海体育场
                                </div>
                                <div className={styles.cinemaItemTagContainer}>
                                    <Tag color='warning'>今日可订</Tag>
                                    <Tag color='primary'>电子票</Tag>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}