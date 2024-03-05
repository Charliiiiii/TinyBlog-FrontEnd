import React from "react";
import styles from "./index.module.scss"
import code from "../../imgs/code.png"
import draft from "../../imgs/draft.png"
import likes from "../../imgs/likes.png"
import writeNotes from "../../imgs/writeNotes.png"
import writePassage from "../../imgs/writePassage.png"

const PopTitle = () => {
  return (
    <>
      <div className={styles.title}>
        <div>
          <img src={writePassage} alt="" />
          <p>写文章</p>
        </div>
        <div>
          <img src={likes} alt="" />
          <p>发沸点</p>
        </div>
        <div>
          <img src={writeNotes} alt="" />
          <p>写笔记</p>
        </div>
        <div>
          <img src={code} alt="" />
          <p>写代码</p>
        </div>
        <div>
          <img src={draft} alt="" />
          <p>草稿箱</p>
        </div>
      </div>
    </>
  )
}

export default PopTitle;