let SQL = require('../services/sql.service');

class Dao {
    static table = 'dao';
    static format() {
    }
    static formatBeforeSave() {
    }
    static async find(query, options) {
        return SQL.find(this.table, query, this.format, options);
    }
    static async save(item) {
        return SQL.save(this.table, item, this.formatBeforeSave);
    }
    static async delete(query) {
        return SQL.delete(this.table, query);
    }
    static async request(query, params) {
        return SQL.request(query, params);
    }
    static async count(column, query) {
        return SQL.count(this.table, column, query)
    }
}

module.exports = Dao;