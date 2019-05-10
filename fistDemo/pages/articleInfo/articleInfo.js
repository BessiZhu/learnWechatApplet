// pages/articleInfo/articleInfo.js
var request = require('../../utils/request.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var typeId = options.typeId;
    // console.log(typeId)
    this.getData(typeId);
    
  },
  getData: function(typeId){
    var that = this;
    request({
      url:'/getArticleTypeTitleInfo/'+typeId,
      success: function(res){
        that.setData({
          bannerbox: res
        })
      }
    });
    request({
      url:'/getArticleTypeList/'+typeId,
      success: function(res){
        that.setData({
          articleList: res
        })
      }
    });
    // wx.request({
    //   url:'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getArticleTypeTitleInfo/'+typeId,
    //   success: function(res){
    //     // console.log(res)
    //     that.setData({
    //       bannerbox:res.data.data
    //     })
    //   }
    // })
    // wx.request({
    //   url:'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getArticleTypeList/'+typeId,
    //   success: function(res){
    //     // console.log(res)
    //     that.setData({
    //       articleList: res.data.data
    //     })
    //   }
    // })
  },
  toDetailTap: function(e){
    var articleId = e.currentTarget.dataset.articleid;
    wx.navigateTo({
      url:'../articleInfoDetail/articleInfoDetail?articleId=' + articleId
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