import React from 'react'
import ReactUeditor from '../src'

class App extends React.Component {
  constructor() {
    super()
    this.editorResult = '<h1>Hello World!</h1>'
    this.ueditor = null
  }

  state = {
    progress: -1,
    content: '',
  }

  uploadImage = e => {
    return new Promise(function(resolve, reject) {
      resolve(window.URL.createObjectURL(e.target.files[0]))
    })
  }

  handlePasteImage = src => {
    return new Promise(function(resolve) {
      resolve('https://s3.ifanr.com/wp-content/uploads/2019/01/WechatIMG974.jpeg!720')
    })
  }

  uploadVideo = e => {
    let _this = this
    return new Promise(function(resolve, reject) {
      let i = 0
      let instance = setInterval(() => {
        if (i !== 100) {
          _this.setState({progress: ++i})
        }
      }, 50)
      setTimeout(() => {
        resolve('https://cloud-minapp-1131.cloud.ifanrusercontent.com/1eBb1SeNlayvGEKT.mp4')
        _this.setState({progress: -1})
        clearInterval(instance)
      }, 5100)
    })
  }

  uploadAudio = e => {
    return new Promise(function(resolve, reject) {
      resolve('https://cloud-minapp-1131.cloud.ifanrusercontent.com/1eEUtZNsjiOiHbWW.mp3')
    })
  }

  updateEditorContent = content => {
    this.editorResult = content
  }

  getUeditor = ref => {
    this.ueditor = ref
    console.log('ueditor', ref)
  }

  getUeditorContent = ref => {
    this.setState({
      content: this.ueditor.getContent(),
    })
  }

  handleReady = () => {
    console.log('be ready')
    this.ueditor.setHeight(400)
  }

  render() {
    let {content, progress} = this.state

    return (
      <div>
        <ReactUeditor
          getRef={this.getUeditor}
          ueditorPath='../vendor/ueditor'
          config={{zIndex: 1001}}
          value={this.editorResult}
          plugins={['uploadImage', 'insertCode', 'uploadVideo', 'uploadAudio']}
          uploadImage={this.uploadImage}
          uploadVideo={this.uploadVideo}
          uploadAudio={this.uploadAudio}
          onChange={this.updateEditorContent}
          progress={progress}
          multipleImagesUpload={false}
          onReady={this.handleReady}
          handlePasteImage={this.handlePasteImage}
          extendControls={[
            {
              name: 'test1',
              menuText: 'test1',
              title: '测试1模态框',
              component: <input />,
            },
            {
              name: 'test2',
              menuText: 'tesst2',
              title: '测试2模态框',
              component: <label>label</label>,
            },
          ]}
        />
        <button onClick={this.getUeditorContent}>获取内容</button>
        <p>{content}</p>
      </div>
    )
  }
}

export default App
