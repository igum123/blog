const jwt = require("jsonwebtoken");

const Config = require('../configs/config');
const UsersDao = require("../modules/users/users.dao");

/**
 * Authentication middleware to check if the user token is valide
 * @constructor
 * @param {object} req - Request object from express
 * @param {object} res - Response  object from express
 * @param {object} next - Next object from express
 */
const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['token'];
        if (!token) {
            throw new Error('Pas de token');
        }
        const decoded = jwt.verify(token, Config.jwtToken);
        req.user = (await UsersDao.find({ email: decoded.email }))[0];
    } catch (e) {
        req.user = null;
    }
    return next();
};

module.exports = {
    verifyToken
};