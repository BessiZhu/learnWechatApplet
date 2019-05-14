// pages/articleInfoDetail/articleInfoDetail.js
var request = require('../../utils/request.js');
var audio = wx.getBackgroundAudioManager();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverHidden: false,
    playing: false,
    audioCurTime: 0,
    progressPercent: 0,
    circleLeft: 0,
    progressWidth: 520,
    circleStartX: 0,
    circleEndX: 0,
    getcircleStartXFlag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(options.articleId)
  },
  /**
   * 获取数据
   */
  getData: function (options) {
    var that = this;
    request({
      url: '/getArticleDetail/' + options,
      success: function (res) {
        // console.log(res)
        that.setData({
          articleDetail: res
        })
      }
    })
  },
  /**
   * 点击视频播放
   */
  videoPlayTap: function () {
    this.setData({
      coverHidden: true
    })
    this.videoCtx = wx.createVideoContext('myVideo');
    this.videoCtx.play();
  },
    /**
   * 音乐播放方法
   */
  audioPlay(){
    audio.title = '此时此刻'
    audio.epname = '此时此刻'
    audio.singer = '许巍'
    audio.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000';
    audio.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46';
    this.listenPlayState()
    this.updateAudioData()
  },
  /**
   * 点击播放/暂停歌曲
   */
  audioPlayTap: function () {
    var playing = this.data.playing
    if (playing) {
      audio.pause()
    } else {
      this.audioPlay() 
    }
    this.setData({
      playing: !playing
    })
  },
  /**
   * 监听歌曲播放状态
   */
  listenPlayState: function () {
    var that = this
    audio.onPlay(function () {
      that.setData({
        playing: true
      })
    })
    audio.onPause(function () {
      that.setData({
        playing: false
      })
    })
    audio.onStop(function () {
      that.setData({
        playing: false
      })
    })
    audio.onEnded(function () {
      that.setData({
        playing: false
      })
    })
  },
  /**
   * 更新歌曲播放时间，进度条，小球移动
   */
  updateAudioData: function(){
    var that = this
    var duration = this.data.articleDetail.audio.duration;
    audio.onTimeUpdate(function() {
      var audioCurTime = audio.currentTime.toFixed()
      var percent = audioCurTime / duration
      var progressPercent = percent * 100
      var circleLeft = that.data.progressWidth * percent
      
      that.setData({
        audioCurTime: audioCurTime,
        progressPercent: progressPercent,
        circleLeft: circleLeft
      })
    }) 
  },
  /**
   * 拖拽小球，更新歌曲播放时间，进度条，播放歌曲
   */
  // 拖拽开始，记录小球起始位置
  onAudioCircleStart: function(e){
    var circleStartX = e.touches[0].pageX * this.getPhoneRadio();
    if(!this.data.getcircleStartXFlag){
      this.setData({
        circleStartX: circleStartX,
        getcircleStartXFlag: true
      })
    }
  },
  // 拖拽中，改变数据
  onAudioCircleMove: function(e){
    var circleStartX = this.data.circleStartX
    var circleEndX = e.touches[0].pageX * this.getPhoneRadio()
    var circleLeft = circleEndX - circleStartX
    var duration = this.data.articleDetail.audio.duration
    var progressWidth = this.data.progressWidth

    if(circleLeft <= 0){
      circleLeft = 0
    }else if(circleLeft >= progressWidth){
      circleLeft = progressWidth
    }
    var percent = circleLeft / progressWidth
    var audioCurTime = (percent * duration).toFixed()
    var progressPercent = percent * 100

    this.audioPlay()
    audio.seek(Number(audioCurTime));

    this.setData({
      audioCurTime: audioCurTime,
      progressPercent: progressPercent,
      circleLeft: circleLeft
    })
  },
  /**
   * 获取设备宽度的rpx比例
   */
  getPhoneRadio: function(){
    var radio = 0;
    wx.getSystemInfo({
      success: function(res){
        var width = res.screenWidth
        radio = 750 / width
      }
    })
    return radio
  }
})