import { Request } from '../utils/request.js'

class IndexModel extends Request {
    getArticleList(magazineId = 0, start = 0) {
        return this.getData({
            url: `/getIndexArticleList/${magazineId}/${start}`
        })
    }
    getMarkTypeList() {
        return this.getData({
            url: '/getMarkTypeList/0'
        })
    }
    getRecommendInfo() {
        return this.getData({
            url: '/getRecommendInfo/0'
        })
    }
}

export { IndexModel }