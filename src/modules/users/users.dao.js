const Config = require('../../configs/config');
const Dao = require('../dao');

class UsersDao extends Dao {
    static table = '`' + Config.database.table + '`.`users`';
    static fieldToSave = ['id', 'role', 'email', 'password', 'firstname', 'lastname', 'imgURL'];
    static async format(item) {
    }
    static async formatBeforeSave(item) {
        for (let key in item) {
            if (UsersDao.fieldToSave.indexOf(key) === -1) {
                delete item[key];
            }
        }
    }
}

module.exports = UsersDao;