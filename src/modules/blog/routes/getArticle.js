const BadRequest = require('../../../services/errors/models/BadRequest');
const Router = require('../../router');

const ArticlesDao = require('../articles.dao');

class GetArticle extends Router {
    formatItem(item) {
        return {
            id: Number(item.id),
            title: item.title,
            description: item.description,
            content: item.content,
            visibledDate: item.visibledDate,
            url: item.url,
            img: item.img
        };
    }
    async usecase() {
        const isAdmin = this.req.user && this.req.user.role === 1;
        const query = { url: this.req.params.articleUrl };
        if (!isAdmin) {
            query.visibledDate = new Date();
        }
        const items = await ArticlesDao.find(query);
        if (!items[0]) throw new BadRequest('GetArticle - No article with url ' + this.req.params.articleUrl);
        return this.format(items[0]);
    }
}


module.exports = GetArticle;