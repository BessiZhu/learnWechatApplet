// components/articleList/cmp.js
import { IndexModel } from '../../models/index.js'

const indexModel = new IndexModel

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        articleList: {
            type: Array,
            value: [],
            observer() {
                // console.log(888)
            }
        },
        more: {
            type: String,
            value: '',
            observer: 'loadMore'
        },
        magazineId: {
            type: Number,
            value: '',
            observer: 'hasMoreData'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        loading: false,
        noMoreData: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        loadMore() {
            if (this._isLock() || this.data.noMoreData) {
                return
            }

            this._loadLock()

            const magazineId = this.data.magazineId
            const start = this.data.articleList.length

            indexModel.getArticleList(magazineId, start).then(res => {
                this._setMoreData(res)
                this._unLoadLock()

            })
        },
        hasMoreData() {
            this.setData({
                noMoreData: false
            })
        },
        _isLock() {
            return this.data.loading
        },
        _loadLock() {
            this.setData({
                loading: true
            })
        },
        _unLoadLock() {
            this.setData({
                loading: false
            })
        },
        _setMoreData(list) {
            const combineList = this.data.articleList.concat(list)
            if (combineList.length === this.data.articleList.length) {
                this.setData({
                    noMoreData: true
                })
                return
            }
            this.setData({
                articleList: combineList
            })
        }


    }
})