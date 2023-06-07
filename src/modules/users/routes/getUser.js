const Router = require('../../router');
const Forbidden = require('../../../services/errors/models/Forbidden');

class GetUser extends Router {
    controller() {
        if (!this.req.user) throw new Forbidden('Not connected');
    }
    formatItem(user) {
        let cardExpired = false;
        let now = new Date();
        let month = now.getMonth() + 1;
        let year = now.getFullYear();
        if (user.subscription && user.subscription.default_payment_method && user.subscription.default_payment_method.card.exp_month < month && user.subscription.default_payment_method.card.exp_year <= year) {
            cardExpired = true;
        }
        return {
            firstname: user.firstname,
            lastname: user.lastname,
            date: user.date,
            imgURL: user.imgURL,
            isAdmin: user.role === 1
        };
    }
    async usecase() {
        return this.format(this.req.user);
    }
}


module.exports = GetUser;