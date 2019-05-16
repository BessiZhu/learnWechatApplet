// components/video/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    poster: String,
    duration: String,
    mainTitle: String,
    videoId: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    showPoster: true
  },
  attached(){
    this._getVideoInfo()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlayTap(){
      this._togglePoster()
      this.video.play()
    },
    onMaskTap(){
      this._togglePoster()
      this.video.seek(0)
      this.video.stop()
    },
    onVideoEnd(){
      this._togglePoster()
    },
    // 切换showPoster的值的方法
    _togglePoster(){
      this.setData({
        showPoster: !this.data.showPoster
      })
    },
    // 获取video信息
    _getVideoInfo(){
      const videoId = this.properties.videoId
      this.video = wx.createVideoContext(videoId, this)
    }

  }
})
