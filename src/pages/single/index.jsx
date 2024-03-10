import React, { useEffect, useMemo, useState } from "react";
import styles from "./index.module.scss"
import { message } from "antd";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Single = () => {

  //取对应id的内容
  const location = useLocation();
  const articleId = useMemo(() => {
    let id = new URLSearchParams(location.search).get("id")
    return id ? parseInt(id) : id
  }, [])
  let [articleData, setArticleData] = useState({})
  useEffect(() => {
    try {
      axios.get(`/api/article/${articleId}/article`)
        .then((result) => {
          let data = result.data.data
          setArticleData(data[0])
        })
    } catch (err) {
      message.error("获取文章失败！")
      return;
    }
  }, [])

  return (
    <div className={styles.singleWrapper}>
      <div className={styles.left}>
        <div className={styles.titleSection}>
          <span className={styles.title}>
            {articleData.title}
          </span>
          <span className={styles.author}>
            {articleData.username}
          </span>
        </div>
        <div className={styles.contentSection}>
          {articleData.content}
        </div>
      </div>
    </div>
  )
}

export default Single;