//index.js
import { IndexModel } from '../../models/index.js'
import { random } from '../../utils/randomStr.js'

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
        articleList: [],
        markTypeList: [],
        recommendInfo: [],
        getMore: '',
        magazineId: 0,
        loading: true
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onLoad() {
            this._getData()
                // wx.showLoading()
        },
        onReachBottom() {
            this.setData({
                getMore: random(20)
            })
        },
        onCatalog() {
            wx.switchTab({
                url: "/pages/catalog/catalog"
            })
        },
        onNav(e) {
            const magazineId = e.detail.index
            this.setMagazineId(magazineId)
            this.resetData()
            this.scrollPageToTop()
            this._getData(magazineId)
        },
        _getData(magazineId) {
            const articleList = indexModel.getArticleList(magazineId)
            const markTypeList = indexModel.getMarkTypeList(magazineId)
            const recommendInfo = indexModel.getRecommendInfo(magazineId)

            Promise.all([articleList, markTypeList, recommendInfo]).then(res => {
                // console.log(res[0])
                this.setData({
                        articleList: res[0],
                        markTypeList: res[1],
                        recommendInfo: res[2]
                    })
                    // wx.hideLoading()
                this._hideLoading()
            })
        },
        _hideLoading() {
            this.setData({
                loading: false
            })
        },
        resetData() {
            this.setData({
                articleList: [],
                markTypeList: [],
                recommendInfo: []
            })
        },
        scrollPageToTop() {
            wx.pageScrollTo({
                scrollTop: 0,
                duration: 0
            })
        },
        setMagazineId(magazineId) {
            this.setData({
                magazineId
            })
        }
    }
})