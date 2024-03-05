import { Collapse } from "antd";
import styles from "./leftBar.module.scss"


const LeftBar = () => {
  const DataCenter = () => {
    return (
      <div className={styles.center} style={{ display: "flex", flexDirection: "column", width: "100%", marginTop: "15px" }}>
        <span className={styles.item} style={{ marginLeft: "30px", fontSize: "16px", color: "#919aa5", cursor: "pointer" }}>内容数据</span>
        <span className={styles.item} style={{ marginLeft: "30px", fontSize: "16px", color: "#919aa5", cursor: "pointer" }}>粉丝数据</span>
      </div>
    )
  }
  const CreateTool = () => {
    return (
      <div className={styles.center} style={{ display: "flex", flexDirection: "column", marginTop: "15px" }}>
        <span className={styles.item} style={{ marginLeft: "30px", fontSize: "16px", color: "#919aa5", cursor: "pointer" }}>文章导入发布</span>
      </div>
    )
  }
  const CreateStronger = () => {
    return (
      <div className={styles.center} style={{ display: "flex", flexDirection: "column", marginTop: "15px" }}>
        <span className={styles.item} style={{ marginLeft: "30px", fontSize: "16px", color: "#919aa5", cursor: "pointer" }}>创作等级权益</span>
        <span className={styles.item} style={{ marginLeft: "30px", fontSize: "16px", color: "#919aa5", cursor: "pointer" }}>创作灵感</span>
      </div>
    )
  }
  const HelpCenter = () => {
    return (
      <div className={styles.center} style={{ display: "flex", flexDirection: "column", marginTop: "15px" }}>
        <span className={styles.item} style={{ marginLeft: "30px", fontSize: "16px", color: "#919aa5", cursor: "pointer" }}>常见问题</span>
      </div>
    )
  }
  const items = [
    {
      key: '1',
      label: '数据中心',
      children: <DataCenter />
    },
    {
      key: '2',
      label: '创作工具',
      children: <CreateTool />,
    },
    {
      key: '3',
      label: '创作成长',
      children: <CreateStronger />,
    },
    {
      key: '4',
      label: '帮助中心',
      children: <HelpCenter />,
    },
  ];
  return (
    <Collapse items={items} bordered={false} defaultActiveKey={['1']} size="large" />
  )
}

export default LeftBar;