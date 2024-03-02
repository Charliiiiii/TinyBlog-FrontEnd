import React, { useCallback, useMemo, useState } from "react"
import styles from "./index.module.scss"
import logo_with_name from "./imgs/logo_with_name.png"
import { Avatar, Button, Col, Form, Input, Modal, Row, message } from "antd"

const UserAvatar = () => {
  //用户状态 -> 显示头像/登录注册按钮
  const [userInfo, setUserInfo] = useState(null);

  const isLogin = useMemo(() => {
    return userInfo !== null;
  }, [userInfo]);

  //登陆注册弹出框
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  //CountDownTime
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

  const handleVerifyClick = useCallback(() => {
    setGetVerifyCode(false);
    countDownTimeFunc(60);
    const phoneNumber = loginForm.getFieldValue("phoneNumber");
    let verifyCode = "123456"; //假设待完成
    message.success(`verifycode: ${verifyCode}`)
  }, [loginForm])






  return (
    <>
      {isLogin
        ? <Avatar size={34} />
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
        onCancel={() => {
          loginForm.resetFields();
          setIsModalOpen(false);
        }}
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
                  <Input placeholder="请输入验证码" />
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
          <Button style={{ width: "100%" }} type="primary">登录 / 注册</Button>
        </Form.Item>
      </Modal>
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