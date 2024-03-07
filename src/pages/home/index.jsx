import React from "react";
import styles from './index.module.scss';
import pic1 from "./imgs/场景管理.svg"
import pic2 from "./imgs/技术服务.svg"
import pic3 from "./imgs/数据看板.svg"
import pic4 from "./imgs/调试.svg"

const Home = () => {
  return (
    <div className={styles.homeContentWrapper}>
      <div className={styles.homeLeftBar}>
        <div className={styles.item}>
          <img src={pic1} alt="" />
          <span className={styles.text}>关注</span>
        </div>
        <div className={styles.item}>
          <img src={pic2} alt="" />
          <span className={styles.text}>综合</span>
        </div>
        <div className={styles.item}>
          <img src={pic3} alt="" />
          <span className={styles.text}>后端</span>
        </div>
        <div className={styles.item}>
          <img src={pic3} alt="" />
          <span className={styles.text}>前端</span>
        </div>
      </div>
      <div className={styles.homeCenter}>
        2
      </div>
      <div className={styles.homeRightBar}>
        <div className={styles.rank}>
          <div className={styles.title}>文章榜</div>
          <div className={styles.list}>
            <span className={styles.listItem}>
              1
            </span>
            <span className={styles.listItem}>
              1
            </span>
            <span className={styles.listItem}>
              1
            </span>
            <span className={styles.listItem}>
              1
            </span>
            <span className={styles.listItem}>
              1
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;