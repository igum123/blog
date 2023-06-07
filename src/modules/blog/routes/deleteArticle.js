const Router = require('../../router');

const ArticlesDao = require('../articles.dao');
const Forbidden = require('../../../services/errors/models/Forbidden');

class DeleteArticles extends Router {
    controller() {
        if (!this.req.user) throw new Forbidden('Not connected');
        if (this.req.user.role !== 1) throw new Forbidden('No admin user.id : ' + this.req.user.id);
    }
    async usecase() {
        const { articleUrl } = this.req.params;
        await ArticlesDao.delete({ url: articleUrl });
        return this.emptyResult();
    }
}


module.exports = DeleteArticles;