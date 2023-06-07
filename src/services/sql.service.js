let mariadb = require('./mariadb.service').pool;

/**
 * Format and do a select request
 * @constructor
 * @param {string} table - Name of table to do the request
 * @param {object} params - Object that form the query
 * @param {function} format - Format the item after return it in promise
 * @param {{limit: number, offset: number, orders: array}} options - Object with the option for limit, offsert and orders
 * @return {Promise} - Return a promise with the result of the query
 */
async function find(table, query, format, options) {
    let limit = options ? options.limit : null;
    let offset = options ? options.offset : null;
    let orders = options ? options.orders : null;
    if (!query) query = {};
    let where = " WHERE 1=1";
    let params = [];
    if (query) {
        for (let field in query) {
            where += ' AND ' + field + '=?';
            params.push(query[field]);
        }
    }
    if (orders && orders.length) {
        where += ' ORDER BY ' + orders.join(', ');
        where += ' DESC';
    }
    if (limit && limit > 0) {
        where += ' LIMIT ' + limit;
    }
    if (offset && offset > 0) {
        where += ' OFFSET ' + offset;
    }
    let datas = await mariadb.query('SELECT * FROM ' + table + where + ';', params);
    for (let data of datas) {
        await format(data);
    }
    return datas;
}

/**
 * Create an object un table
 * @constructor
 * @param {string} table - Name of table to do the request
 * @param {object} obj - Object to create in db
 * @return {Promise} - Return a promise with the id of the created object
 */
async function create(table, obj) {
    let fieldStr = '';
    let interogationFieldStr = '';
    let values = [];
    for (let field in obj) {
        fieldStr += field + ',';
        interogationFieldStr += '?,';

        let value = obj[field];
        if (value === undefined) value = null;
        values.push(value);
    }
    fieldStr = fieldStr.slice(0, -1);
    interogationFieldStr = interogationFieldStr.slice(0, -1);
    const result = await mariadb.query('INSERT INTO ' + table + ' (' + fieldStr + ') VALUES (' + interogationFieldStr + ');', values);
    return result.insertId;
}

/**
 * Update an object un table
 * @constructor
 * @param {string} table - Name of table to do the request
 * @param {object} query - Object that the query
 * @param {object} fieldsToUpdate - Object contained field and value of the change to do
 * @return {Promise} - Return a promise with the id of the updated object
 */
async function update(table, query, fieldsToUpdate) {
    let set = '';
    let where = '';
    let values = [];
    delete fieldsToUpdate.id;

    for (let field in fieldsToUpdate) {
        set += ' ' + field + '=?,';
        let value = fieldsToUpdate[field];
        values.push(value);
    }
    if (set) {
        set = set.slice(0, -1);
        set = ' SET' + set;
    }
    where += " WHERE 1=1";
    if (query) {
        for (let field in query) {
            where += ' AND ' + field + '=?';
            values.push(query[field]);
        }
    }
    await mariadb.query('UPDATE ' + table + set + where + ';', values);
    return query.id;
}

/**
 * Create or update an object if there is an id
 * @constructor
 * @param {string} table - Name of table to do the request
 * @param {object} query - Object that the query
 * @param {function} format - Function to format before saving in db
 * @return {Promise} - Return a promise with the id of the created / updated object
 */
function save(table, item, format) {
    if (format) format(item);
    if (item.id) {
        return update(table, { id: item.id }, item);
    } else {
        return create(table, item);
    }
}

/**
 * Delete an object in db
 * @constructor
 * @param {string} table - Name of table to do the request
 * @param {object} query - Object that the query
 * @return {Promise} - Return a promise
 */
async function deleteFunc(table, query) {
    let where = " WHERE 1=1";
    let values = [];
    for (let field in query) {
        where += ' AND ' + field + '=?';
        values.push(query[field]);
    }
    await mariadb.query('DELETE FROM ' + table + where + ';', values);
    return Promise.resolve(null);
}

/**
 * Count the number of object by column
 * @constructor
 * @param {string} table - Name of table to do the request
 * @param {string} colomn - Column name to count
 * @param {object} query - Object that the query
 * @return {Promise} - Return a promise
 */
async function count(table, colomn, query) {
    let where = " WHERE 1=1";
    let values = [];
    if (query) {
        for (let field in query) {
            where += ' AND ' + field + '=?';
            values.push(query[field]);
        }
    }
    const result = await mariadb.query('SELECT COUNT(' + colomn + ') FROM ' + table + where + ';', values);
    return result[0]['COUNT(' + colomn + ')'];
}

/**
 * Do a custom request
 * @constructor
 * @param {string} query - String that represent the SQL query
 * @param {array} params - Array with the value to add in the query
 * @return {Promise} - Return a promise of the query result
 */
async function request(query, params) {
    const result = await mariadb.query(query, params);
    return result;
}



module.exports = {
    find,
    create,
    update,
    save,
    delete: deleteFunc,
    count,
    request
};
