import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from './index.module.scss';
import pic1 from "./imgs/场景管理.svg"
import pic2 from "./imgs/技术服务.svg"
import pic3 from "./imgs/数据看板.svg"
import pic4 from "./imgs/调试.svg"
import axios from "axios";
import recoPic from "./imgs/推荐位.png"
import changePic from "./imgs/web__换一换.png"
import { Empty, message } from "antd";
import { Link } from "react-router-dom";

const categotyList = [
  { name: "综合", key: "", pic: pic1 },
  { name: "技术", key: "technique", pic: pic1 },
  { name: "生活", key: "life", pic: pic1 },
  { name: "美食", key: "food", pic: pic1 },
  { name: "电影", key: "movie", pic: pic1 },
  { name: "摄影", key: "photography", pic: pic1 },
  { name: "学习", key: "study", pic: pic1 },
]

const Home = () => {
  const [curCategory, setCurCategory] = useState("")
  const [canLoadMore, setCanLoadMore] = useState(true)
  const [isloading, setIsLoading] = useState(false)
  //获取类别数据
  const handleClassClick = useCallback((category, oldArticleList) => {
    setIsLoading(true)
    let pageSize = 10
    let page = Math.floor(oldArticleList.length / pageSize) + 1
    try {
      let url = `/api/article?page=${page}&pageSize=${pageSize}`
      if (category) {
        url += `&category=${category}`
      }
      axios.get(url)
        .then(data => {
          let res = data?.data?.data || []
          setAriticleList([...oldArticleList, ...res])
          setCanLoadMore(res.length === pageSize)
        })
    } catch (err) {
      message.error("获取数据失败！")
    }
    setIsLoading(false)
  }, [])

  //拿对应id的数据
  const [ariticleList, setAriticleList] = useState([]);
  useEffect(() => {
    handleClassClick(curCategory, [])
  }, [curCategory, handleClassClick])

  //将HTML文件转换为text
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  //渲染数据列表的组件
  const AriticleListComponent = () => {
    return (
      <div className={styles.ariticleWrapper} >
        {ariticleList?.length === 0 ?
          (<div style={{ marginTop: 100 }}>
            <Empty description="这里什么都没有">
            </Empty>
          </div>) :
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
                        <img src={article.cover_url} alt="" />
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

  // 实现懒加载
  //监听标志
  const observerRef = useRef(null);
  useEffect(() => {
    //canLoadMore：如果数据少于一页，说明数据已经加载完了
    //isLoading：不在加载状态，防止重复加载
    if (canLoadMore && !isloading) {
      //监听器
      const observer = new IntersectionObserver((entries) => {
        //如果被监听元素出现在了界面，说明需要进行加载
        if (entries[0].isIntersecting) {
          handleClassClick(curCategory, ariticleList)
        }
      })
      // 监听元素
      observer.observe(observerRef.current);
      //停止观察元素
      return () => observer.disconnect();
    }
  }, [ariticleList, canLoadMore, curCategory, handleClassClick, isloading])

  return (
    <div className={styles.homeWrapper}>
      <div className={styles.leftWrapper}>
        <div className={styles.section}>
          {
            categotyList.map((item, index) => {
              return (
                <div className={styles.class} onClick={() => setCurCategory(item.key)} key={index}>
                  <img src={item.pic} alt="" />
                  <span className={styles.text}>{item.name}</span>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className={styles.middleWrapper}>
        <div className={styles.middleContent}>
          <AriticleListComponent />
          <div ref={observerRef} />
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