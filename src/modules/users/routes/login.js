const Router = require('../../router');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UsersDao = require('../users.dao');
const BadRequest = require('../../../services/errors/models/BadRequest');
const Config = require('../../../configs/config');

class Login extends Router {
    controller() {
        if (!this.req.body || !this.req.body.password || !this.req.body.email) {
            throw new BadRequest('Login No email ' + this.req.body.email);
        }
    }
    async usecase() {
        const { email, password } = this.req.body;
        let users = await UsersDao.find({ email });
        if (!users[0]) {
            throw new BadRequest(`No account : ${email}`);
        }
        const user = users[0];
        if (!bcrypt.compareSync(password, user.password)) {
            throw new BadRequest(`Wrong password : ${user.email}`);
        }
        const token = jwt.sign({ email: user.email }, Config.jwtToken);
        return this.format(token);
    }
}


module.exports = Login;