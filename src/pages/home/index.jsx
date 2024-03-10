import React, { useCallback, useEffect, useState } from "react";
import styles from './index.module.scss';
import pic1 from "./imgs/场景管理.svg"
import pic2 from "./imgs/技术服务.svg"
import pic3 from "./imgs/数据看板.svg"
import pic4 from "./imgs/调试.svg"
import axios from "axios";
import recoPic from "./imgs/推荐位.png"
import changePic from "./imgs/web__换一换.png"
import { message } from "antd";
import { Link } from "react-router-dom";

const Home = () => {

  //获取类别数据
  const handleClassClick = useCallback((category) => {
    try {
      let url = `/api/article`
      if (category) {
        url += `?category=${category}`
      }
      axios.get(url)
        .then(data => {
          data = data.data
          setAriticleList(data.data)
        })
    } catch (err) {
      message.error("获取数据失败！")
    }
  }, [])

  //拿对应id的数据
  const [ariticleList, setAriticleList] = useState([]);
  useEffect(() => {
    handleClassClick()
  }, [handleClassClick])

  //将HTML文件转换为text
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  //渲染数据列表的组件
  const AriticleListComponent = () => {
    return (
      <div className={styles.ariticleWrapper} >
        {
          ariticleList.map(article => {
            let articleId = article.id;
            return (
              <Link to={`/single?id=${articleId}`}>
                <div className={styles.articleItemWrapper} key={articleId} >
                  <div className={styles.leftBox}>
                    <div className={styles.title} >
                      {article.title}
                    </div>
                    <div className={styles.content}>
                      {getText(article.content)}
                    </div>
                    <div className={styles.usernameAndCategory}>
                      <div className={styles.username}>
                        {article.username}
                      </div>
                      <div className={styles.category}>
                        {article.category}
                      </div>
                    </div>
                  </div>
                  {
                    article.cover_url === null
                      ? <div style={{ border: "none" }}></div>
                      : <div className={styles.cover}>
                        <img src={article.cover_url} />
                      </div>
                  }

                </div>
              </Link>


            )
          })
        }
      </div >

    )
  }
  return (
    <div className={styles.homeWrapper}>
      <div className={styles.leftWrapper}>
        <div className={styles.section}>
          <div className={styles.class} onClick={() => handleClassClick()}>
            <img src={pic1} alt="" />
            <span className={styles.text}>综合</span>
          </div>
          <div className={styles.class} onClick={() => handleClassClick('technique')}>
            <img src={pic1} alt="" />
            <span className={styles.text}>技术</span>
          </div>
          <div className={styles.class} onClick={() => handleClassClick('life')}>
            <img src={pic1} alt="" />
            <span className={styles.text}>生活</span>
          </div>
          <div className={styles.class} onClick={() => handleClassClick('food')}>
            <img src={pic1} alt="" />
            <span className={styles.text}>美食</span>
          </div>
          <div className={styles.class} onClick={() => handleClassClick('movie')}>
            <img src={pic1} alt="" />
            <span className={styles.text}>电影</span>
          </div>
          <div className={styles.class} onClick={() => handleClassClick('photography')}>
            <img src={pic1} alt="" />
            <span className={styles.text}>摄影</span>
          </div>
          <div className={styles.class} onClick={() => handleClassClick('study')}>
            <img src={pic1} alt="" />
            <span className={styles.text}>学习</span>
          </div>
        </div>
      </div>
      <div className={styles.middleWrapper}>
        <div className={styles.middleContent}>
          <AriticleListComponent />
        </div>
      </div>
      <div className={styles.rightWrapper}>
        <div className={styles.titleBar}>
          <span className={styles.title}>
            <span className={styles.recoPic}>
              <img src={recoPic} alt="" style={{ width: "16px" }} />
            </span>
            <span className={styles.recoText}>
              推荐阅读
            </span>
          </span>
          <div className={styles.changeBar}>
            <span className={styles.changePic}>
              <img src={changePic} alt="" style={{ width: "16px" }} />
            </span>
            <span className={styles.changeText}>
              换一换
            </span>
          </div>
        </div>
        <div className={styles.recommend}>
          <div className={styles.item}>
            <span className={styles.nums} style={{ color: "red" }}>1</span>
            <span className={styles.text}>回县城躺平，感觉我的人生过得好失败回县城躺平，感觉我的人生过得好失败</span>
          </div>
          <div className={styles.item}>
            <span className={styles.nums} style={{ color: "darkblue" }} >2</span>
            <span className={styles.text}>一夜之间，3.0万 Star，全部清零！一夜之间，3.0万 Star，全部清零！</span>
          </div>
          <div className={styles.item}>
            <span className={styles.nums} style={{ color: "pink" }}>3</span>
            <span className={styles.text}>一夜之间，3.0万 Star，全部清零！一夜之间，3.0万 Star，全部清零！</span>
          </div>
          <div className={styles.item}>
            <span className={styles.nums} style={{ color: "darkgray" }}>4</span>
            <span className={styles.text}>回到县城</span>
          </div>
          <div className={styles.item} >
            <span className={styles.nums} style={{ color: "orange" }}>5</span>
            <span className={styles.text}>回到县城</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home;