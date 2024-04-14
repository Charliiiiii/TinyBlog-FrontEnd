import React from "react";
import styles from "./iconwrap.module.scss"
import logo_with_name from "./logo_with_name.png"
import { Link } from "react-router-dom";

const IconWrap = () => {
  return (
    <Link className={styles.iconWrap} to={'/'}>
      <img src={logo_with_name} alt="" />
    </Link>
  )
}

export default IconWrap;