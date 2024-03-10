import React, { useCallback, useEffect, useMemo, useState } from "react"
import styles from "./index.module.scss"
import { Avatar, Button, Col, Form, Input, Modal, Popconfirm, Popover, Row, message } from "antd"
import axios from "axios"
import searchLogo from "./imgs/search.png";
import downArrow from "./imgs/downArrow.png";
import PopContent from "./popCard/popContent";
import PopTitle from "./popCard/popTitle";
import { Link, Router, useLocation, useNavigate } from "react-router-dom"
import IconWrap from "../iconwrap/iconwarp.js"

const UserAvatar = ({
  userInfo,
  setUserInfo,
  isLogin,
  isModalOpen,
  setIsModalOpen
}) => {
  //登陆注册弹出框
  //Form
  const [loginForm] = Form.useForm();

  const validatePhoneNumber = useCallback((_, value) => {
    if (value) {
      let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (reg.test(value)) {
        return Promise.resolve()
      }
      return Promise.reject(new Error('手机号无效'));
    } else {
      return Promise.reject(new Error('手机号不得为空'));
    }
  }, [])

  //倒计时
  const [releaseSecond, setReleaseSecond] = useState(60)
  const countDownTimeFunc = useCallback((releaseSecond) => {
    setReleaseSecond(releaseSecond)
    if (releaseSecond > 0) {
      setTimeout(() => {
        countDownTimeFunc(releaseSecond - 1)
      }, 1000)
    } else {
      setGetVerifyCode(true)
    }
  }, [])

  //VerifyCode
  const [getVerifyCode, setGetVerifyCode] = useState(true)

  const handleVerifyClick = useCallback(async () => {
    const phoneNumber = loginForm.getFieldValue("phoneNumber");

    let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (!reg.test(phoneNumber)) {
      message.error("手机号无效")
      return;
    }
    // 发送请求获取验证码
    setGetVerifyCode(false);
    countDownTimeFunc(60);
    try {
      let data = await axios.get(`/api/auth/getVerifyCode?phone=${phoneNumber}`)
      console.log(data)
      data = data.data
      if (data?.code === 200) {
        message.success(`验证码：${data?.data?.verifyCode || "xxxx"}`)
      } else {
        message.error(data?.msg || "获取验证码失败")
      }
    } catch (error) {
      console.log(error)
      message.error("获取验证码失败")
    }
    // message.success(`verifycode: ${verifyCode}`)
  }, [countDownTimeFunc, loginForm])


  const handleCancle = useCallback(() => {
    loginForm.resetFields();
    setIsModalOpen(false);
  }, [])

  let getUserInfo = useCallback(async () => {
    try {
      let { data } = await axios.get("/api/auth/getUserInfo")
      setUserInfo(data.data)
    } catch (e) {
      console.log(e)
    }
  }, [])

  useEffect(() => {
    let cookies = document.cookie.split(";")
    let hasToken = cookies.some((value) => {
      return value.trim().startsWith("access_token")
    })
    if (hasToken) {
      getUserInfo()
    }
  }, [getUserInfo])

  //handleLoginClick
  const handleLoginClick = useCallback(async () => {
    loginForm.validateFields()
      .then(async (formData) => {
        //发送请求到后端进行登录/注册
        try {
          let { data } = await axios.post("/api/auth/login", {
            phone: formData?.phoneNumber,
            verifyCode: formData?.verifyCode
          })
          if (data?.code !== 200) {
            message.error(data?.msg || "登陆失败")
            return;
          }
          handleCancle()
          setUserInfo(data.data)

        } catch (e) {
          console.log(e)
        }
      })
      .catch()
  }, [loginForm, handleCancle])

  const navigate = useNavigate()
  const handleLogoutClick = useCallback(async () => {
    let logout = await axios.post('/api/auth/userLogout')
    setUserInfo(null)
    message.success("注销成功！")
    navigate('/')
  })

  return (
    <>
      {isLogin
        ?
        <Popconfirm
          title="确认退出？"
          onConfirm={handleLogoutClick}
          okText="确认"
          cancelText="取消"
        >
          <Avatar size={34} style={{ cursor: "pointer" }} />
        </Popconfirm>
        : (
          <div className={styles.button} >
            <button onClick={() => setIsModalOpen(true)}>
              登录 <div className={styles.line}></div> 注册
            </button>
          </div>
        )}

      <Modal
        title="登录畅享更多权益"
        open={isModalOpen}
        onCancel={handleCancle}
        centered
        footer={null}
      >
        <div className={styles.loginFormTitle}>验证码登录/注册</div>
        <Form form={loginForm}>
          <Form.Item
            name="phoneNumber"
            rules={[{ validator: validatePhoneNumber }]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item>
            <Row gutter={8}>
              <Col span={18}>
                <Form.Item
                  name="verifyCode"
                  noStyle
                  rules={[{ required: true, message: "验证码不能为空" }]}
                >
                  <Input placeholder="请输入验证码" onPressEnter={handleLoginClick} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Button
                  style={{ width: "100%" }}
                  onClick={handleVerifyClick}
                  disabled={!getVerifyCode}
                >{getVerifyCode ? "获取验证码" : `${releaseSecond}秒后获取`}</Button>
              </Col>
            </Row>

          </Form.Item>
        </Form>
        <Form.Item>
          <Button style={{ width: "100%" }} type="primary" onClick={handleLoginClick}>登录 / 注册</Button>
        </Form.Item>
      </Modal>
    </>
  )
}

const Navbar = () => {
  //用户状态 -> 显示头像/登录注册按钮
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const isLogin = useMemo(() => {
    return userInfo !== null;
  }, [userInfo]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  let handleCreateCenter = useCallback(() => {
    // 先判断有没有登录
    if (!isLogin) {
      setIsModalOpen(true)
      return;
    }
    //登陆后跳转链接
    navigate('/createCenter')
  }, [isLogin])

  const location = useLocation();
  const isCreateCenter = useMemo(() => {
    return (location.pathname.startsWith("/createCenter") || location.pathname.startsWith("/writeArticle"))
  }, [location])

  return (
    <div className={styles.container}>
      <div className={styles.centerWrap}>
        <IconWrap />
        {
          isCreateCenter
            ? (
              <div className={styles.menuWrap} style={{ fontSize: "20px", color: "#1d7dfa" }}>
                创作者中心
              </div>
            )
            : (
              <div className={styles.menuWrap}>
                <div className={styles.textsSpan}>
                  <Link to="/">
                    <div className={styles.textSpan} >
                      首页
                    </div>
                  </Link>

                  <div className={styles.textSpan}>
                    沸点
                  </div>
                  <div className={styles.textSpan}>
                    直播
                  </div>
                  <div className={styles.textSpan}>
                    活动
                  </div>
                  <div className={styles.textSpan}>
                    竞赛
                  </div>
                  <div className={styles.textSpan}>
                    商城
                  </div>
                  <div className={styles.textSpan}>
                    APP
                  </div>
                  <div className={styles.textSpan}>
                    插件
                  </div>

                </div>
                <div className={styles.searchBar}>
                  <input type="text" placeholder="搜索小狗炒鱼" />
                  <div className={styles.searchIcon}>
                    <img src={searchLogo} alt="" />
                  </div>
                </div>
                <div className={styles.writeCenter}>
                  <div className={styles.writeContainer}>
                    <button className={styles.createButton} onClick={handleCreateCenter}>
                      创作者中心
                    </button>
                    <div className={styles.downArrow}>

                      <Popover placement="bottomRight" title={<PopTitle />} content={<PopContent />} arrow={false}>
                        <img src={downArrow} alt="" />
                      </Popover>
                    </div>
                  </div>
                </div>
              </div>
            )
        }
        <div className={styles.loginWrap}>
          <UserAvatar
            setUserInfo={setUserInfo}
            userInfo={userInfo}
            isLogin={isLogin}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      </div>
    </div >
  )
}

export default Navbar;