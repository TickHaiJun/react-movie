import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast, Tabs, InfiniteScroll, SearchBar, DotLoading } from 'antd-mobile';
import { FilterOutline } from 'antd-mobile-icons';
import styles from './Movie.module.css';
import { eventService } from '../../services/api';

// 电影分类
const categories = [
    { key: 'all', title: '全部' },
    { key: 'action', title: '动作' },
    { key: 'comedy', title: '喜剧' },
    { key: 'romance', title: '爱情' },
    { key: 'science', title: '科幻' },
    { key: 'thriller', title: '惊悚' }
];

const Movie = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('all');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        fetchMovies(true);
    }, [activeTab]);

    const fetchMovies = async (reset = false) => {
        try {
            setLoading(true);
            const currentPage = reset ? 1 : page;
            
            // 获取电影类型的活动
            const params = {
                type: 'MOVIE',
                page: currentPage,
                pageSize: 10
            };
            
            // 这里应该根据activeTab进一步筛选，但我们的API不支持，
            // 所以先获取所有电影，然后前端筛选
            const response = await eventService.searchEvents(params);
            
            if (reset) {
                setMovies(response.items);
                setPage(1);
            } else {
                setMovies(prev => [...prev, ...response.items]);
                setPage(currentPage + 1);
            }
            
            setHasMore(currentPage < response.totalPages);
        } catch (error) {
            console.error('获取电影列表失败:', error);
            Toast.show({
                content: '获取电影列表失败',
                position: 'bottom',
            });
        } finally {
            setLoading(false);
        }
    };

    const loadMore = async () => {
        await fetchMovies();
    };

    const handleSearch = (value) => {
        if (!value.trim()) return;
        navigate(`/search?keyword=${encodeURIComponent(value)}&type=MOVIE`);
    };

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    const handleMovieClick = (movieId) => {
        navigate(`/detail?id=${movieId}`);
    };

    return (
        <div className={styles.container}>
            {/* 搜索栏 */}
            <div className={styles.searchHeader}>
                <div className={styles.searchBar}>
                    <SearchBar
                        placeholder="搜索电影"
                        value={keyword}
                        onChange={setKeyword}
                        onSearch={handleSearch}
                    />
                </div>
                <FilterOutline className={styles.filterIcon} />
            </div>

            {/* 分类标签 */}
            <div className={styles.tabs}>
                <Tabs activeKey={activeTab} onChange={handleTabChange}>
                    {categories.map(category => (
                        <Tabs.Tab key={category.key} title={category.title} />
                    ))}
                </Tabs>
            </div>

            {/* 电影列表 */}
            <div className={styles.movieList}>
                {loading && page === 1 ? (
                    <div className={styles.loadingContainer}>
                        <DotLoading /> 加载中...
                    </div>
                ) : movies.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>暂无电影</p>
                    </div>
                ) : (
                    <div className={styles.movieGrid}>
                        {movies.map(movie => (
                            <div 
                                key={movie.id} 
                                className={styles.movieCard}
                                onClick={() => handleMovieClick(movie.id)}
                            >
                                <div 
                                    className={styles.posterContainer}
                                    style={{ backgroundImage: `url(${movie.backgroundImage || 'https://via.placeholder.com/200x300'})` }}
                                >
                                    <div className={styles.movieRating}>9.2</div>
                                </div>
                                <div className={styles.movieInfo}>
                                    <h3 className={styles.movieTitle}>{movie.title}</h3>
                                    <p className={styles.movieMeta}>{movie.location}</p>
                                    <p className={styles.movieTime}>{movie.time}</p>
                                    <p className={styles.moviePrice}>¥{movie.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
                    {hasMore ? (
                        <div className={styles.loadingMore}>
                            <DotLoading /> 加载更多
                        </div>
                    ) : (
                        <div className={styles.noMore}>没有更多内容了</div>
                    )}
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default Movie;
