import React, { useState } from "react";
import styles from "./index.module.scss"
import search from "../navbar/imgs/search.png"
import { Button, Empty, Skeleton } from "antd";

const CreateHome = () => {
  const [ariticleList, setAriticleList] = useState([])

  return (
    <div className={styles.wrapper}>
      <div className={styles.headWrapper}>
        <button>写文章</button>
        <div className={styles.inputWrapper}>
          <input type="text" placeholder="请输入标题关键词"></input>
          <span><img src={search}></img></span>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <Skeleton active loading={false} >
          {ariticleList.length === 0 && (<div className={styles.emptyWrapper}><Empty description="这里什么都没有"> <Button type="primary">开始创作</Button></Empty></div>)}
        </Skeleton>
      </div>
    </div >
  )
}

export default CreateHome;