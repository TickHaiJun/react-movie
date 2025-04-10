import style from './DetailInfo.module.css'

export default function DetailInfo() {
    return (
        <div className={style.container}>
            {/* 背景图片区域 */}
            <div className={style.bgContainer}>
                <div className={style.bgImage}></div>
                <div className={style.mask}></div>
            </div>

            {/* 电影信息区域 */}
            <div className={style.movieInfo}>
                <div className={style.poster}></div>
                <div className={style.info}>
                    <h1>奥本海默</h1>
                    <div className={style.rating}>
                        <span className={style.score}>9.2</span>
                        <span className={style.count}>123.4万人评</span>
                    </div>
                    <div className={style.tags}>
                        <span>剧情</span>
                        <span>传记</span>
                        <span>战争</span>
                    </div>
                    <div className={style.meta}>美国 · 2023 · 180分钟</div>
                </div>
            </div>

            {/* 日期选择区域 */}
            <div className={style.dateSelect}>
                <div className={`${style.dateItem} ${style.active}`}>
                    <div>今天</div>
                    <div>10/20</div>
                </div>
                <div className={style.dateItem}>
                    <div>明天</div>
                    <div>10/21</div>
                </div>
                <div className={style.dateItem}>
                    <div>周日</div>
                    <div>10/22</div>
                </div>
                <div className={`${style.dateItem} ${style.active}`}>
                    <div>今天</div>
                    <div>10/20</div>
                </div>
                <div className={style.dateItem}>
                    <div>明天</div>
                    <div>10/21</div>
                </div>
                <div className={style.dateItem}>
                    <div>周日</div>
                    <div>10/22</div>
                </div>
            </div>

            {/* 影院选择区域 */}
            <div className={style.cinemaSelect}>
                <h2>影院选择</h2>
                <div className={style.cinemaItem}>
                    <div className={style.cinemaInfo}>
                        <h3>万达影城（海淀店）</h3>
                        <p>海淀区中关村大街136号方广大厦5层</p>
                        <span className={style.distance}>4.5km</span>
                        <span className={style.discount}>退票低至7折</span>
                    </div>
                    <div className={style.showTimes}>
                        <div className={style.timeItem}>
                            <div>10:30</div>
                            <div>原版2D</div>
                        </div>
                        <div className={style.timeItem}>
                            <div>13:15</div>
                            <div>IMAX 2D</div>
                        </div>
                        <div className={style.timeItem}>
                            <div>15:50</div>
                            <div>原版2D</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 底部购票按钮 */}
            <div className={style.buyTicket}>
                <div className={style.discount}>影票特惠，首单立减10元</div>
                <button className={style.buyButton}>特惠购票</button>
            </div>
        </div>
    )
}