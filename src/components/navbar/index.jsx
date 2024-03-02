import React, { useMemo, useState } from "react"
import styles from "./index.module.scss"
import logo_with_name from "./imgs/logo_with_name.png"
import { Avatar } from "antd"

const UserAvatar = () => {
  const [userInfo, setUserInfo] = useState({})
  const isLogin = useMemo(() => {
    return userInfo !== null;
  }, [userInfo]);

  return (
    <>
      {isLogin ? <div className={styles.avatar}><Avatar size={34} /></div> : <div className={styles.button} ><button >登录 <div className={styles.line}></div> 注册</button></div>}
    </>
  )
}

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.centerWrap}>
        <div className={styles.iconWrap}>
          <img src={logo_with_name} alt="" />
        </div>
        <div className={styles.menuWrap}>
          menu
        </div>
        <div className={styles.loginWrap}>
          <UserAvatar />
        </div>
      </div>
    </div>
  )
}

export default Navbar;