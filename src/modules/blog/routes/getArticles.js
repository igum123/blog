const Router = require('../../router');

const ArticlesDao = require('../articles.dao');

class GetArticles extends Router {
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
        const nbArticleByPage = 10;
        const query = this.req.query;
        const isAdmin = this.req.user && this.req.user.role === 1;
        const sqlQuery = {};
        if (!isAdmin) {
            sqlQuery.visibledDate = new Date();
        }
        let offset = 0;
        if (query.page) {
            offset = query.page * nbArticleByPage;
        }
        const items = await ArticlesDao.find(sqlQuery, nbArticleByPage, offset);
        const max = await ArticlesDao.count(sqlQuery);
        return {
            data: {
                max: Math.ceil(Number(max) / nbArticleByPage),
                current: query.page || 0,
                items: items.map((item) => {
                    return this.formatItem(item);
                })
            }
        };
    }
}


module.exports = GetArticles;