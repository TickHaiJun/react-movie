import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import styles from './Index.module.css'
import { Button, SearchBar, Toast, Swiper, CapsuleTabs } from 'antd-mobile'
import { BellOutline } from 'antd-mobile-icons'
// import { SwiperRef } from 'antd-mobile/es/components/swiper'
import CardItem from "@/components/CardItem/CardItem"
import { eventService } from "../../services/api"

const bannerList = [
    // 'https://img3.doubanio.com/view/photo/l/public/p2920155682.webp',
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
            <img src={movie} alt="" style={{ width: '100%' }} />
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
        type: 'MOVIE',
        label: '电影'
    },
    {
        id: 3,
        type: 'CONCERT',
        label: '演唱会'
    },
   
]

const tabItem = tabList.map((item) => (
    <CapsuleTabs.Tab key={item.id} title={item.label} />
))

export default function Index() {
    const [activeTab, setActiveTab] = useState('all')
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchKeyword, setSearchKeyword] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        // 检查URL中是否有tab参数
        const params = new URLSearchParams(location.search)
        const tabParam = params.get('tab')
        if (tabParam) {
            const tab = tabList.find(t => t.type.toLowerCase() === tabParam.toLowerCase())
            if (tab) {
                setActiveTab(tab.type)
            }
        }
        
        fetchEvents()
    }, [location])

    const fetchEvents = async () => {
        try {
            setLoading(true)
            const data = await eventService.getAllEvents()
            setEvents(data)
        } catch (error) {
            console.error('获取活动列表失败:', error)
            Toast.show({
                content: '获取活动列表失败',
                position: 'bottom',
            })
        } finally {
            setLoading(false)
        }
    }

    const handleTabChange = (key) => {
        const tab = tabList.find(item => item.id.toString() === key)
        setActiveTab(tab ? tab.type : 'all')
    }

    const handleSearchChange = (value) => {
        setSearchKeyword(value)
    }

    const handleSearch = (value) => {
        if (!value.trim()) {
            Toast.show({
                content: '请输入搜索关键词',
                position: 'bottom',
            })
            return
        }
        
        // 跳转到搜索结果页面
        navigate(`/search?keyword=${encodeURIComponent(value)}&type=${activeTab}`)
    }

    const handleEventClick = (eventId) => {
        navigate(`/detail?id=${eventId}`)
    }

    // 根据活动类型筛选活动
    const getFilteredEvents = (type) => {
        if (!events || events.length === 0) return []
        if (type === 'all') return events
        return events.filter(event => event.type === type)
    }

    // 电影类型活动
    const movieEvents = getFilteredEvents('MOVIE')
    // 演唱会类型活动
    const concertEvents = getFilteredEvents('CONCERT')
    // 话剧类型活动
    const dramaEvents = getFilteredEvents('DRAMA')
    // 当前选中标签筛选后的活动
    const filteredEvents = getFilteredEvents(activeTab)

    return (
        <div className={styles.mainContainer}>
            {/* 头部 */}
            <div className={styles.headContainer}>
                <div className={styles.searchContainer}>
                    <SearchBar 
                        placeholder='搜索电影、演唱会、话剧' 
                        onSearch={handleSearch}
                        onChange={handleSearchChange}
                        value={searchKeyword}
                    />
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
                <CapsuleTabs onChange={handleTabChange} defaultActiveKey="1">
                    {tabList.map(item => (
                        <CapsuleTabs.Tab key={item.id} title={item.label} />
                    ))}
                </CapsuleTabs>
            </div>

            {/* 分类内容显示 */}
            {loading ? (
                <div className={styles.loading}>加载中...</div>
            ) : activeTab === 'all' ? (
                <>
                    {/* 首页展示不同类型的活动 */}
                    <CardItem 
                        title="正在热映" 
                        type="MOVIE" 
                        items={movieEvents} 
                        onItemClick={handleEventClick}
                    />
                    
                    <CardItem 
                        title="热门演唱会" 
                        type="CONCERT" 
                        items={concertEvents} 
                        onItemClick={handleEventClick}
                    />
                    
                    {/* <CardItem 
                        title="精彩话剧" 
                        type="DRAMA" 
                        items={dramaEvents} 
                        onItemClick={handleEventClick}
                    /> */}
                </>
            ) : (
                <div className={styles.categoryList}>
                    {/* <h2>{tabList.find(item => item.type === activeTab)?.label || '全部活动'}</h2> */}
                    {/* <div className={styles.eventGrid}>
                        {filteredEvents.map(event => (
                            <div 
                                key={event.id} 
                                className={styles.eventCard}
                                onClick={() => handleEventClick(event.id)}
                            >
                                <div 
                                    className={styles.eventImage}
                                    style={{ backgroundImage: `url(${event.backgroundImage || 'https://via.placeholder.com/150x200'})` }}
                                ></div>
                                <div className={styles.eventInfo}>
                                    <h3>{event.title}</h3>
                                    <p>{event.time}</p>
                                    <p className={styles.eventPrice}>¥{event.price}</p>
                                </div>
                            </div>
                        ))}
                    </div> */}

                    <CardItem 
                        type={activeTab}
                        items={filteredEvents} 
                        onItemClick={handleEventClick}
                    />
                </div>
            )}
        </div>
    )
}