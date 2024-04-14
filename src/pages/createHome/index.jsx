import React, { useCallback, useEffect, useState } from "react";
import styles from "./index.module.scss"
import search from "../../components/navbar/imgs/search.png"
import { Button, Empty, Skeleton, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import deletepic from "./imgs/删除.png"
import editpic from "./imgs/编辑.png"

const debounce = (callback, delay = 1000) => {
  let timer = null
  return function () {
    let arg = arguments
    let _this = this;
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      callback.apply(_this, arg)
    }, delay)
  }
}

const CreateHome = () => {
  const navigate = useNavigate()
  const handlePublishClick = () => {
    navigate("/writeArticle")
  }

  //拿对应用户id的数据库数据
  const [ariticleList, setAriticleList] = useState([]);


  //搜索关键词
  const [inputValue, setInputValue] = useState("")
  const [searchKeyword, setSearchKeyword] = useState("")

  const handleChangeKeyword = useCallback(debounce((inputValue) => {
    setSearchKeyword(inputValue)
  }, 500), [])

  useEffect(() => {
    handleChangeKeyword(inputValue)
  }, [handleChangeKeyword, inputValue])

  //获取表单值
  const handleInputChange = useCallback((event) => {
    event.preventDefault();
    setInputValue(event.target.value);
  }, [])
  //搜索
  const handleSearchClick = useCallback(() => {
    axios.get(`/api/article/bykeyword/${searchKeyword}`)
      .then((response) => {
        setAriticleList(response.data.data)
      })
  }, [searchKeyword])

  useEffect(() => {
    handleSearchClick()
  }, [handleSearchClick])
  //将HTML文件转换为text
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  //删除数据
  const handleDelete = useCallback((articleId) => {
    try {
      axios.post(`/api/article/delete/${articleId}`)
      handleSearchClick()
    } catch (e) {
      message.error(e)
    }
  }, [handleSearchClick])

  //渲染数据列表的组件
  const AriticleListComponent = () => {
    return (
      <div className={styles.ariticleWrapper} >
        {
          ariticleList.map(article => {
            return (
              <div className={styles.articleItemWrapper} key={article.id} >
                <div className={styles.left}>
                  <div className={styles.title} >
                    {article.title}
                  </div>
                  <div className={styles.content}>
                    {getText(article.content)}
                  </div>
                  <div className={styles.Footer}>
                    <div className={styles.username}>
                      {article.username}
                    </div>
                    <img src={deletepic} alt="" style={{ width: "20px" }} onClick={() => handleDelete(article.id)} />
                    <Link to={`/writeArticle?id=${article.id}`}>
                      <img src={editpic} alt="" style={{ width: "15px" }} />
                    </Link>
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
            )
          })
        }
      </div >
    )
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.headWrapper}>
        <button onClick={handlePublishClick}>写文章</button>
        <div className={styles.inputWrapper}>
          <input type="text" placeholder="请输入标题关键词" value={inputValue} onChange={handleInputChange}></input>
          <span><img src={search} onClick={handleSearchClick} alt=""></img></span>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <Skeleton active loading={false} >
          {ariticleList?.length === 0 ?
            (<div className={styles.emptyWrapper}>
              <Empty description="这里什么都没有">
                <Button type="primary" onClick={handlePublishClick}>开始创作</Button>
              </Empty>
            </div>) :
            <AriticleListComponent />
          }
        </Skeleton>
      </div>
    </div >
  )
}

export default CreateHome;
