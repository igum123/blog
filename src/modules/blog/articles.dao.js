let SQL = require('../../services/sql.service');
const Dao = require('../dao');
const Config = require('../../configs/config');

class ArticlesDao extends Dao {
    static table = '`' + Config.database.table + '`.`articles`';
    static formatBeforeSave(item) {
        if (item && item.visibledDate) item.visibledDate = new Date(item.visibledDate);
    }
    static async find(query, limit, offset) {
        let where = '1=1';
        let params = [];
        if (query.visibledDate) {
            where += ' AND visibledDate<?';
            params.push(query.visibledDate);
        }
        if (query.url) {
            where += ' AND url=?';
            params.push(query.url);
        }
        if (query.categoryId) {
            where += ' AND categoryId=?';
            params.push(query.categoryId);
        }
        where += ' ORDER BY visibledDate DESC';
        if (limit && limit > 0) {
            where += ' LIMIT ' + limit;
        }
        if (offset && offset > 0) {
            where += ' OFFSET ' + offset;
        }
        return SQL.request(`SELECT * FROM ${this.table} WHERE ${where}`, params);
    }

    static async count(query) {
        let where = " WHERE 1=1";
        let params = [];
        if (query.visibledDate) {
            where += ' AND visibledDate<?';
            params.push(query.visibledDate);
        }
        if (query.categoryId) {
            where += ' AND categoryId=?';
            params.push(query.categoryId);
        }
        const result = await SQL.request('SELECT COUNT(id) FROM ' + this.table + where + ';', params);
        return result[0]['COUNT(id)'];
    }
}

module.exports = ArticlesDao;