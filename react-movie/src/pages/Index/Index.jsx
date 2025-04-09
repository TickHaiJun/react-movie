
import { useState } from "react"
import styles from './Index.module.css'
import { Button, SearchBar, Toast, Swiper, CapsuleTabs } from 'antd-mobile'
import { BellOutline } from 'antd-mobile-icons'
// import { SwiperRef } from 'antd-mobile/es/components/swiper'

const bannerList = [
    'https://img3.doubanio.com/view/photo/l/public/p2920155682.webp',
    'https://img2.baidu.com/it/u=309764682,4179453885&fm=253&fmt=auto&app=120&f=JPEG?w=1091&h=500',
    'https://img1.baidu.com/it/u=3857800149,4254472967&fm=253&fmt=auto&app=138&f=JPEG?w=1000&h=500'
]


const items = bannerList.map((movie, index) => (
    <Swiper.Item key={index}>
        <div
            onClick={() => {
                Toast.show(`你点击了卡片 ${index + 1}`)
            }}
        >
            <img src={movie} alt="" style={{ width: '100%', height: '100%' }} />
        </div>
    </Swiper.Item>
))


const tabList = [
    {
        id: 1,
        type: 'all',
        label: '全部'
    },
    {
        id: 2,
        type: 'movie',
        label: '电影'
    },
    {
        id: 3,
        type: 'concert',
        label: '演唱会'
    },
    {
        id: 4,
        type: 'exhibition',
        label: '展览'
    },
    {
        id: 5,
        type: 'drama',
        label: '话剧歌剧'
    },
]

const tabItem = tabList.map((item) => (
    <CapsuleTabs.Tab key={item.id} title={item.label} />
))

export default function Index() {
    return (
        <div className={styles.mainContainer}>
            {/* 头部 */}
            <div className={styles.headContainer}>
                <div className={styles.searchContainer}>
                    <SearchBar placeholder='搜索，电影，影院，演出' />
                </div>

                <BellOutline fontSize={24} />
            </div>
            {/* 轮播图 */}
            <div className={styles.swiperContainer}>
                <Swiper
                    loop
                    autoplay
                    style={{
                        '--border-radius': '8px',
                    }}
                >
                    {items}
                </Swiper>
            </div>
            {/* tab-srcool */}
            <div className={styles.tabScroolContainer}>
                <CapsuleTabs defaultActiveKey='1'>
                    {tabItem}
                </CapsuleTabs>
            </div>
            
        </div>
    )
}