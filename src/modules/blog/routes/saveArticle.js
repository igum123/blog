const Router = require('../../router');
const fs = require('fs');
const path = require('path');

const ArticlesDao = require('../articles.dao');
const Forbidden = require('../../../services/errors/models/Forbidden');
const BadRequest = require('../../../services/errors/models/BadRequest');
const UploadService = require('../../../services/upload.service');

class SaveArticle extends Router {
    controller() {
        if (!this.req.user) throw new Forbidden('Not connected');
        if (this.req.user.role !== 1) throw new Forbidden('No admin user.id : ' + this.req.user.id);
    }
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
        const informations = await UploadService.upload(this.req);
        const fields = informations.fields;
        if (informations.files && informations.files.file) {
            if (informations.fields.img && fs.existsSync(path.resolve(__dirname, '../../../../img', informations.fields.img))) {
                fs.unlinkSync(path.resolve(__dirname, '../../../../img', informations.fields.img));
            }
            fields.img = informations.files.file.newFilename;
        }
        if (!fields.title || !fields.description || !fields.content || !fields.url) throw new BadRequest(`SaveArticle - No title, description, content or url`);
        await ArticlesDao.save(fields);
        const items = await ArticlesDao.find({ url: fields.url });

        return this.format(items[0]);
    }
}


module.exports = SaveArticle;