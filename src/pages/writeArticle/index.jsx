import React, { useState, useEffect, useCallback, useMemo } from "react";
import styles from "./index.module.scss"
import { Button, Checkbox, Radio, Tag, Upload, message } from "antd";
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Content } from "antd/es/layout/layout";

const WriteArticle = () => {
  const [editor, setEditor] = useState(null)
  const [html, setHtml] = useState('')

  // 获取编辑文章
  const location = useLocation();
  const articleId = useMemo(() => {
    let id = new URLSearchParams(location.search).get("id")
    return id ? parseInt(id) : id
  }, [])

  useEffect(() => {
    if (!articleId) {
      return;
    }
    axios.get(`/api/article/${articleId}/article`)
      .then(response => {
        console.log(response.data.data[0])
        const { title, content, cover_url, category } = response.data.data[0];

        setInputValue(title);
        setHtml(content);
        if (cover_url) {
          setCoverList([{
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: cover_url,
          }])
        }
        setCategoryValue(category)
      })
  }, [articleId])

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
    if (e.target.value.length > 30) {
      message.error("标题不能超过30个字哦~")
      return;
    }
    setInputValue(e.target.value)
  }
  const [categoryValue, setCategoryValue] = useState("technique");
  const onCategoryChange = (e) => {
    setCategoryValue(e.target.value);
  };

  //发布文章的逻辑
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate()
  const [coverList, setCoverList] = useState([]);
  const handlePublishClick = useCallback(async () => {
    //取url
    let cover_url = null;

    if (coverList.length > 0) {
      cover_url = coverList[0]?.xhr || coverList[0]?.url || null;

    }
    try {
      setIsSending(true)
      const postData = {
        title: inputValue,
        content: html,
        category: categoryValue,
        cover_url
      }
      // 获取文章 id
      if (articleId) {
        postData.id = articleId
      }
      const { data } = await axios.post('/api/article', postData)
      if (data.code !== 200) {
        message.error(data.msg)
        return;
      }
      message.success(data.msg)

      navigate("/createCenter")
    } catch (e) {
      console.log(e)
    }
    setIsSending(false)

  }, [inputValue, html, categoryValue, navigate, coverList])

  //富文本参数配置
  const toolbarConfig = {
  }
  const editorConfig = {
    scroll: false,
    placeholder: '请输入内容...',
    readonly: isSending,
    MENU_CONF: {
      uploadImage: {
        customUpload: async (file, insertFn) => {
          const formData = new FormData()
          formData.append("file", file)
          const { data } = await axios.post("/api/common/uploadFile", formData, {
            headers: {
              "content-Type": "multipart/form-data"
            }
          })
          insertFn(data.data.url)
        }
      }
    }
  }

  //上传照片


  const props = {
    beforeUpload: (file) => {
      const imgType = ["image/png", "image/jpg", "image/jpeg"]
      const isType = imgType.includes(file.type)
      if (!isType) {
        message.error("文件类型错误！")
        return false
      }
      return true;
    },
    onChange: (info) => {
      setCoverList(info?.fileList || [])
    },
    customRequest: async (option) => {
      const formData = new FormData()
      formData.append("file", option.file)
      const { data } = await axios.post("/api/common/uploadFile", formData)
      if (data.code !== 200) {
        option.onError(data.msg)
        return
      }
      option.onSuccess(data, data.data.url)
    }
  };
  return (
    <div className={styles.writeWrapper}>
      <div div className={styles.writeArea} >
        <input
          onChange={handleInputChange}
          value={inputValue}
          type="text"
          placeholder="请输入文章标题..."
          disabled={isSending}
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
            <Button type="primary" loading={isSending} onClick={handlePublishClick}>发布文章</Button>
          </div>
          <div className={styles.uploadFile}>
            <Upload
              listType="picture-card"
              fileList={coverList}
              maxCount={1}
              {...props}
              accept="image/png, image/jpg, image/jpeg"
            >
              {coverList.length < 1 && "上传封面"}
            </Upload>
          </div>
          <Radio.Group
            onChange={onCategoryChange}
            value={categoryValue}
            style={{ display: "flex", flexDirection: "column", marginLeft: "20px", gap: "15px" }}
            disabled={isSending}

          >
            <Radio value={"technique"} >技术</Radio>
            <Radio value={"food"}>美食</Radio>
            <Radio value={"movie"}>电影</Radio>
            <Radio value={"photography"}>摄影</Radio>
            <Radio value={"study"}>学习</Radio>
            <Radio value={"life"}>生活</Radio>
          </Radio.Group>
        </div>
      </div>
    </div >
  )
}

export default WriteArticle;