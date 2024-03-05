import React from "react";
import styles from "./createHome.module.scss"
import LeftBar from "./leftBar/leftBar";
import TextManage from "./textManage/textManage";

const CreateHome = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.button}>
            <button>写文章</button>
          </div>
          <div className={styles.leftBar}>
            <LeftBar />
          </div>
        </div>
        <div className={styles.center}>
          <TextManage />
        </div>
        <div className={styles.right}>right</div>
      </div>
    </div >
  )
}

export default CreateHome;