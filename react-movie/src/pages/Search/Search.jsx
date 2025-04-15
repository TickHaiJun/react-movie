import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, SearchBar, Toast, InfiniteScroll, Button, DotLoading } from 'antd-mobile';
import { LeftOutline, SearchOutline, FilterOutline } from 'antd-mobile-icons';
import styles from './Search.module.css';
import { eventService } from '../../services/api';

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useState(new URLSearchParams(location.search));
    
    const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
    const [activeTab, setActiveTab] = useState(searchParams.get('type') || 'all');
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [results, setResults] = useState([]);
    
    // 搜索类型标签
    const tabs = [
        { key: 'all', title: '全部' },
        { key: 'MOVIE', title: '电影' },
        { key: 'CONCERT', title: '演唱会' },
        { key: 'DRAMA', title: '话剧' },
    ];
    
    useEffect(() => {
        if (keyword.trim()) {
            searchEvents(true);
        }
    }, [keyword, activeTab]);
    
    const searchEvents = async (reset = false) => {
        if (!keyword.trim()) return;
        
        try {
            setLoading(true);
            const currentPage = reset ? 1 : page;
            
            const params = {
                title: keyword,
                type: activeTab === 'all' ? undefined : activeTab,
                page: currentPage,
                pageSize: 10
            };
            
            const response = await eventService.searchEvents(params);
            
            if (reset) {
                setResults(response.items);
                setPage(1);
            } else {
                setResults([...results, ...response.items]);
                setPage(currentPage + 1);
            }
            
            setTotalPages(response.totalPages);
            setHasMore(currentPage < response.totalPages);
        } catch (error) {
            console.error('搜索失败：', error);
            Toast.show({
                content: '搜索失败，请稍后再试',
                position: 'bottom',
            });
        } finally {
            setLoading(false);
        }
    };
    
    const loadMore = async () => {
        if (page > totalPages) {
            setHasMore(false);
            return;
        }
        
        await searchEvents();
    };
    
    const handleSearch = (value) => {
        setKeyword(value);
        
        // 更新URL参数
        const newParams = new URLSearchParams();
        newParams.set('keyword', value);
        newParams.set('type', activeTab);
        navigate(`/search?${newParams.toString()}`);
        
        searchEvents(true);
    };
    
    const handleTabChange = (key) => {
        setActiveTab(key);
        
        // 更新URL参数
        const newParams = new URLSearchParams();
        newParams.set('keyword', keyword);
        newParams.set('type', key);
        navigate(`/search?${newParams.toString()}`);
    };
    
    const handleEventClick = (eventId) => {
        navigate(`/detail?id=${eventId}`);
    };
    
    const handleBack = () => {
        navigate(-1);
    };
    
    return (
        <div className={styles.container}>
            {/* 头部搜索栏 */}
            <div className={styles.searchHeader}>
                <LeftOutline className={styles.backIcon} onClick={handleBack} />
                <div className={styles.searchBar}>
                    <SearchBar
                        value={keyword}
                        onChange={setKeyword}
                        onSearch={handleSearch}
                        placeholder="搜索电影、演唱会、话剧"
                        showCancelButton={false}
                    />
                </div>
            </div>
            
            {/* 分类标签 */}
            <div className={styles.tabs}>
                <Tabs activeKey={activeTab} onChange={handleTabChange}>
                    {tabs.map(tab => (
                        <Tabs.Tab key={tab.key} title={tab.title} />
                    ))}
                </Tabs>
            </div>
            
            {/* 搜索结果 */}
            <div className={styles.searchResults}>
                {loading && page === 1 ? (
                    <div className={styles.loadingContainer}>
                        <DotLoading /> 加载中...
                    </div>
                ) : results.length === 0 ? (
                    <div className={styles.emptyResults}>
                        <SearchOutline className={styles.emptyIcon} />
                        <p>未找到相关内容</p>
                        <p className={styles.emptySuggestion}>尝试其他关键词或筛选条件</p>
                    </div>
                ) : (
                    <>
                        <div className={styles.resultCount}>
                            找到相关结果 <strong>{results.length}</strong> 条
                        </div>
                        <div className={styles.resultGrid}>
                            {results.map(event => (
                                <div
                                    key={event.id}
                                    className={styles.eventCard}
                                    onClick={() => handleEventClick(event.id)}
                                >
                                    <div
                                        className={styles.eventImage}
                                        style={{ backgroundImage: `url(${event.backgroundImage || 'https://via.placeholder.com/150x200'})` }}
                                    >
                                        <span className={styles.eventType}>{event.type}</span>
                                    </div>
                                    <div className={styles.eventInfo}>
                                        <h3 className={styles.eventTitle}>{event.title}</h3>
                                        <p className={styles.eventTime}>{event.time}</p>
                                        <p className={styles.eventLocation}>{event.location}</p>
                                        <p className={styles.eventPrice}>¥{event.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
                            {hasMore ? (
                                <div className={styles.loadingMore}>
                                    <DotLoading /> 加载更多
                                </div>
                            ) : (
                                <div className={styles.noMore}>没有更多内容了</div>
                            )}
                        </InfiniteScroll>
                    </>
                )}
            </div>
        </div>
    );
};

export default Search; 