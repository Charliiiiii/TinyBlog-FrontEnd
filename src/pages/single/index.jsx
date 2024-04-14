import React, { useEffect, useMemo, useState } from "react";
import styles from "./index.module.scss"
import { message } from "antd";
import axios from "axios";
import { useLocation } from "react-router-dom";
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'

const Single = () => {

  //取对应id的内容
  const location = useLocation();
  const articleId = useMemo(() => {
    let id = new URLSearchParams(location.search).get("id")
    return id ? parseInt(id) : id
  }, [location.search])
  let [articleData, setArticleData] = useState({})
  useEffect(() => {
    try {
      axios.get(`/api/article/${articleId}/article`)
        .then((result) => {
          let data = result.data.data
          console.log(data)
          setArticleData(data[0])
        })
    } catch (err) {
      message.error("获取文章失败！")
      return;
    }
  }, [articleId])

  const codes = document.querySelectorAll('pre code')
  codes.forEach((el) => {
    hljs.highlightElement(el)
  })

  return (
    <div className={styles.singleWrapper}>
      <div className={styles.left}>
        <div className={styles.titleSection}>
          <span className={styles.title}>
            {articleData.title}
          </span>
          <span className={styles.author}>
            {`用户：${articleData.username}`}
          </span>
        </div>
        <div className={styles.contentSection}>
          <div dangerouslySetInnerHTML={{ __html: articleData?.content || '' }} />
          {/* {articleData?.content} */}
        </div>
      </div>
    </div>
  )
}

export default Single;