import React from "react";
import styles from "./iconwrap.module.scss"
import logo_with_name from "./logo_with_name.png"

const IconWrap = () => {
  return (
    <div className={styles.iconWrap}>
      <img src={logo_with_name} alt="" />
    </div>
  )
}

export default IconWrap;