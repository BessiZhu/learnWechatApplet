import {Request} from '../utils/request.js'

class IndexModel extends Request{
    getArticleList () {
        return this.getData({
            url: '/getIndexArticleList/0/0'
           })
    }
    getMarkTypeList () {
        return this.getData({
            url: '/getMarkTypeList/0'
           })
    }
    getRecommendInfo () {
        return this.getData({
            url: '/getRecommendInfo/0'
           })
    }
}

export {IndexModel}