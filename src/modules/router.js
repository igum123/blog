const CustomError = require('../services/errors/error.service');

class Router {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    permissions() {
    }
    controller() {
    }
    async usecase() {
        return this.emptyResult();
    }


    formatItem(item) {
        return item;
    }
    format(item) {
        return { data: this.formatItem(item) };
    }
    formatAll(items) {
        const result = [];
        for (let item of items) {
            result.push(this.formatItem(item));
        }
        return { data: result };
    }
    emptyResult() {
        return { message: 'ok' }
    }

    async process() {
        try {
            if (!this.req || !this.res) {
                throw CustomError.format(CustomError.ERROR_CODE.ERROR, 'An error occured, please try later');
            }
            await this.permissions();
            this.controller();
            const result = await this.usecase();
            this.res.send(result);
        } catch (e) {
            const errorToSend = new CustomError(e);
            errorToSend.send(this.res, this.constructor.name);
        }
    }
}

module.exports = Router;