const Router = require('../../router');

const ArticlesDao = require('../articles.dao');

class GenerateSiteMap extends Router {
    formatItem(item) {
        return {
            title: item.title,
            description: item.description,
            content: item.content,
            visibledDate: item.visibledDate,
            url: item.url,
            img: item.img
        };
    }
    async process() {
        try {
            const nbArticleByPage = 10;
            const query = this.req.query;
            const sqlQuery = {};
            sqlQuery.visibledDate = new Date();
            const items = await ArticlesDao.find(sqlQuery);
            const max = await ArticlesDao.count(sqlQuery);

            this.res.send({
                max: Math.ceil(max / nbArticleByPage),
                current: query.page || 0,
                data: {
                    ...items,
                    items: items.map((item) => {
                        return this.formatItem(item);
                    })
                }
            });
        } catch (e) {
            const errorToSend = new CustomError(e);
            errorToSend.send(this.res, this.constructor.name);
        }
    }
}


module.exports = GenerateSiteMap;