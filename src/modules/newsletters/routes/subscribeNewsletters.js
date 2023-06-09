const Router = require('../../router');

const SendinblueService = require('../../../services/sendinblue.service');
const BadRequest = require('../../../services/errors/models/BadRequest');

class SubscribeNewsletters extends Router {
    controller() {
        if (!this.req.body || !this.req.body.email || !this.req.body.firstname) {
            throw new BadRequest('Login No email ' + this.req.body.email);
        }
    }
    async usecase() {
        const { email, firstname, lastname } = this.req.body;
        SendinblueService.addContact(email, 4, firstname, lastname).catch((e) => { console.log(e) });
        return this.emptyResult();
    }
}


module.exports = SubscribeNewsletters;