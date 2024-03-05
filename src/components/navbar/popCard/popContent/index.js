import React from "react";
import styles from "./index.module.scss"
import { Tag } from "antd";

const PopContent = () => {
  return (
    <>
      <div className={styles.content}>
        <div className={styles.title}>
          <span className={styles.titleLeft}>创作灵感</span>
          <span className={styles.seeMore}>查看更多</span>
        </div>

        <div className={styles.recommend}>
          <div className={styles.activity}>
            <div className="tag">
              <Tag color="magenta">活动</Tag>
            </div>
            <span>写原创好文，瓜分万元现金大奖写原创好文，瓜分万元现金大奖写原创好文，瓜分万元现金大奖写原创好文，瓜分万元现金大奖</span>
          </div>
          <div className={styles.activity}>
            <div className="tag">
              <Tag color="magenta">活动</Tag>
            </div>
            <span>创作者训练营|助理每一位创作新星，写出个人</span>
          </div>
          <div className={styles.activity}>
            <div className="tag">
              <Tag color="blue">话题</Tag>
            </div>
            <span>#Sora技术探索</span>
          </div>

        </div>
      </div>
    </>
  )
}

export default PopContent;