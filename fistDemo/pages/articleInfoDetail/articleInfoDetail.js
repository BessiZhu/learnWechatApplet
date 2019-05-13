// pages/articleInfoDetail/articleInfoDetail.js
var request = require('../../utils/request.js');
var audio = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverHidden: false,
    playing: false,
    audioCurTime: 0,
    progressPercent: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(options.articleId)
    audio.stop()
  },
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
  videoPlayTap: function () {
    this.setData({
      coverHidden: true
    })
    this.videoCtx = wx.createVideoContext('myVideo');
    this.videoCtx.play();
  },
  audioPlayTap: function () {
    var playing = this.data.playing
    audio.title = '此时此刻'
    audio.epname = '此时此刻'
    audio.singer = '许巍'
    audio.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000';

    if (!playing) {
      audio.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46';
    } else {
      audio.pause()
    }
    this.setData({
      playing: !playing
    })
    
    this.listenPlayState()
    this.updateAudioData()
  },
  listenPlayState: function () {
    var that = this
    audio.onPlay(function () {
      that.setData({
        playing: false
      })
    })
    audio.onPause(function () {
      that.setData({
        playing: true
      })
    })
    audio.onStop(function () {
      that.setData({
        playing: true
      })
    })
    audio.onEnded(function () {
      that.setData({
        playing: true
      })
    })
  },
  updateAudioData: function(){
    var that = this
    var duration = this.data.articleDetail.audio.duration
    
    audio.onTimeUpdate(function() {
      var audioCurTime = that.data.audioCurTime
      var percent = audioCurTime / duration
      var progressPercent = percent * 100
      
      that.setData({
        audioCurTime: audio.currentTime.toFixed(),
        progressPercent: progressPercent
      })
    }) 
  },
   /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})