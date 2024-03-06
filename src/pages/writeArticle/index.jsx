import React, { useState, useEffect } from "react";
import styles from "./index.module.scss"
import { Button, Checkbox, Radio, Tag, message } from "antd";
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

const WriteArticle = () => {
  const [editor, setEditor] = useState(null)
  const [html, setHtml] = useState('')
  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    setTimeout(() => {
      setHtml('<p>hello world</p>')
    }, 1500)
  }, [])
  const toolbarConfig = {}
  const editorConfig = {
    scroll: false,                        // JS 语法
    placeholder: '请输入内容...',
  }
  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])
  const [inputValue, setInputValue] = useState("")

  const handleInputChange = (e) => {
    if (e.target.value.length > 10) {
      message.error("标题不能超过10个字哦~")
      return;
    }
    setValue(e.target.value)
  }
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className={styles.writeWrapper}>
      <div div className={styles.writeArea} >
        <input
          onChange={handleInputChange}
          value={inputValue}
          type="text"
          placeholder="请输入文章标题..."
        />
        <div style={{ height: "100%" }}>
          <Toolbar
            editor={editor}
            defaultConfig={toolbarConfig}
            mode="default"
          />
          <Editor
            defaultConfig={editorConfig}
            value={html}
            onCreated={setEditor}
            onChange={editor => setHtml(editor.getHtml())}
            mode="default"
            style={{ height: "100%", overflowY: 'hidden' }}
          />
        </div>
      </div >
      <div className={styles.tagWrapper}>
        <div className={styles.tagArea}>
          <div className={styles.button}>
            <Button type="primary" >发布文章</Button>
          </div>
          <Radio.Group
            onChange={onChange}
            value={value}
            style={{ display: "flex", flexDirection: "column", marginLeft: "20px", gap: "15px" }
            }>
            <Radio value={1} >技术</Radio>
            <Radio value={2}>美食</Radio>
            <Radio value={3}>电影</Radio>
            <Radio value={4}>摄影</Radio>
            <Radio value={5}>学习</Radio>
            <Radio value={6}>生活</Radio>
          </Radio.Group>
        </div>
      </div>
    </div >
  )
}

export default WriteArticle;