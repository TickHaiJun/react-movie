// 演唱会 演出页面
// 课单独设计这个页面，请求到的接口数据返回到这个

import React, { useState, useEffect } from 'react';
import { SearchBar, Tabs, Toast, DotLoading, InfiniteScroll } from 'antd-mobile';
import { FilterOutline } from 'antd-mobile-icons';
import styles from './Concert.module.css';

// Concert categories
const CATEGORIES = [
  { key: 'all', title: '全部' },
  { key: 'classical', title: '古典' },
  { key: 'rock', title: '摇滚' },
  { key: 'jazz', title: '爵士' },
  { key: 'pop', title: '流行' },
  { key: 'folk', title: '民谣' },
];

// Mock concert data generator
const generateMockConcerts = (page, category) => {
  const concerts = [];
  const startIdx = (page - 1) * 10;
  const count = page === 1 ? 10 : Math.floor(Math.random() * 5) + 3; // Random count for subsequent pages
  
  for (let i = 0; i < count; i++) {
    const idx = startIdx + i;
    const categoryKey = category === 'all' 
      ? CATEGORIES[Math.floor(Math.random() * (CATEGORIES.length - 1)) + 1].key
      : category;
    
    concerts.push({
      id: `concert-${categoryKey}-${idx}`,
      title: `${categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)} Symphony No.${idx + 1}`,
      venue: `${['Grand Hall', 'City Concert Hall', 'Music Center', 'Cultural Palace'][idx % 4]}`,
      date: `2023-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
      time: `${Math.floor(Math.random() * 12) + 1}:${['00', '30'][Math.floor(Math.random() * 2)]} PM`,
      price: Math.floor(Math.random() * 500) + 100,
      rating: (Math.random() * 2 + 3).toFixed(1), // Rating between 3.0 and 5.0
      image: `https://picsum.photos/300/400?random=${idx}`,
      category: categoryKey,
    });
  }
  
  return concerts;
};

const Concert = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [concertList, setConcertList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  
  const fetchConcerts = async (isRefresh = false) => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const currentPage = isRefresh ? 1 : page;
      const newConcerts = generateMockConcerts(currentPage, activeTab);
      
      // Filter by search keyword if provided
      const filteredConcerts = searchKeyword
        ? newConcerts.filter(concert => 
            concert.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            concert.venue.toLowerCase().includes(searchKeyword.toLowerCase())
          )
        : newConcerts;
      
      if (isRefresh) {
        setConcertList(filteredConcerts);
        setPage(2);
      } else {
        setConcertList(prev => [...prev, ...filteredConcerts]);
        setPage(prev => prev + 1);
      }
      
      // No more data if less than expected count is returned
      setHasMore(filteredConcerts.length >= (currentPage === 1 ? 10 : 3));
    } catch (error) {
      Toast.show({
        content: '加载失败，请重试',
        position: 'bottom',
      });
      console.error('Failed to fetch concerts:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch concerts when tab changes or search is performed
  useEffect(() => {
    fetchConcerts(true);
  }, [activeTab, searchKeyword]);
  
  const handleSearch = (value) => {
    setSearchKeyword(value);
  };
  
  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.searchHeader}>
        <SearchBar
          className={styles.searchBar}
          placeholder="搜索音乐会"
          value={searchKeyword}
          onChange={handleSearch}
          showCancelButton
        />
        <FilterOutline className={styles.filterIcon} />
      </div>
      
      <Tabs 
        className={styles.tabs}
        activeKey={activeTab}
        onChange={handleTabChange}
      >
        {CATEGORIES.map(category => (
          <Tabs.Tab key={category.key} title={category.title} />
        ))}
      </Tabs>
      
      <div className={styles.concertList}>
        {loading && page === 1 ? (
          <div className={styles.loadingContainer}>
            <DotLoading /> 加载中...
          </div>
        ) : concertList.length > 0 ? (
          <>
            <div className={styles.concertGrid}>
              {concertList.map(concert => (
                <div key={concert.id} className={styles.concertCard}>
                  <div 
                    className={styles.posterContainer}
                    style={{ backgroundImage: `url(${concert.image})` }}
                  >
                    <div className={styles.concertRating}>
                      {concert.rating} ⭐
                    </div>
                  </div>
                  <div className={styles.concertInfo}>
                    <h3 className={styles.concertTitle}>{concert.title}</h3>
                    <div className={styles.concertMeta}>{concert.venue}</div>
                    <div className={styles.concertTime}>{concert.date} | {concert.time}</div>
                    <div className={styles.concertPrice}>¥{concert.price}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <InfiniteScroll
              loadMore={fetchConcerts}
              hasMore={hasMore}
              threshold={250}
            >
              {hasMore ? (
                <div className={styles.loadingMore}>
                  <DotLoading /> 加载更多...
                </div>
              ) : (
                <div className={styles.noMore}>没有更多了</div>
              )}
            </InfiniteScroll>
          </>
        ) : (
          <div className={styles.emptyState}>
            暂无音乐会，请更换筛选条件
          </div>
        )}
      </div>
    </div>
  );
};

export default Concert;