const Router = require('../../router');

const Forbidden = require('../../../services/errors/models/Forbidden');
const UploadService = require('../../../services/upload.service');

class SaveArticleImg extends Router {
    controller() {
        if (!this.req.user) throw new Forbidden('Not connected');
        if (this.req.user.role !== 1) throw new Forbidden('No admin user.id : ' + this.req.user.id);
    }
    async usecase() {
        const informations = await UploadService.upload(this.req);
        return { data: informations.files.file.newFilename };
    }
}


module.exports = SaveArticleImg;