//index.js
import {IndexModel} from '../../models/index.js'
const indexModel = new IndexModel

Component({
  /**
   * 组件的属性列表
   */
  properties: {
 
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(){
      this._getData()
      wx.showLoading()
    },
    _getData() {
      const articleList = indexModel.getArticleList()
      const markTypeList = indexModel.getMarkTypeList()
      const recommendInfo = indexModel.getRecommendInfo()

      Promise.all([articleList, markTypeList, recommendInfo]).then( res => {
        console.log(res[0])
        this.setData({
          articleList: res[0],
          markTypeList: res[1],
          recommendInfo: res[2]
        })
        wx.hideLoading()
      })
    }
  }
})
