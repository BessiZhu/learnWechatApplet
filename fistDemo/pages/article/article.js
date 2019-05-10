// pages/article/article.js
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
    this.getData();
    this.getLikeData();
    
  },
  moreTap: function(e){
    var type = e.currentTarget.dataset.articletype;
    wx.showActionSheet({
      itemList: ['内容过期了','内容和'+type+'不相关','不再显示'+type+'相关内容'],
      itemColor: '#333'
    })
  },
  onlikeTap: function(e){
    var index = e.currentTarget.dataset.articleindex;
    var listLike = this.data.listLike;
    var isLike = !listLike[index];
    listLike[index] = isLike;
    this.setData({
      listLike: listLike
    })
    wx.setStorageSync('listLike', listLike);
  },
  getData: function(){
    var that = this;
    request({
      url:'/getRecommendInfo',
      success: function(res){
        that.setData({
          recommend: res
        })
      }
    });
    request({
      url:'/getMarkTypeList',
      success: function(res){
        that.setData({
          markType: res
        })
      }
    });
    request({
      url:'/getHomeArticleList',
      success: function(res){
        that.setData({
          articleList: res
        })
      }
    });
    // wx.request({
    //   url:'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getRecommendInfo',
    //   success: function(res){
    //     // console.log(res)
    //     that.setData({
    //       recommend: res.data.data
    //     })
    //   }
    // })
    // wx.request({
    //   url:'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getMarkTypeList',
    //   success: function(res){
    //     // console.log(res)
    //     that.setData({
    //       markType: res.data.data
    //     })
    //   }
    // })
    // wx.request({
    //   url:'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getHomeArticleList',
    //   success: function(res){
    //     // console.log(res.data.data)
    //     that.setData({
    //       articleList: res.data.data
    //     })
    //   }
    // })
  },
  getLikeData: function(){
    var listLikeStorage = wx.getStorageSync("listLike");
    if(!listLikeStorage){
      listLikeStorage = {}
    }
    this.setData({
      listLike: listLikeStorage
    })
  },
  toInfoTap: function(e){
    var articletypeid = e.currentTarget.dataset.articletypeid;
    wx.navigateTo({
      url:"../articleInfo/articleInfo?typeId="+articletypeid
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