const mariadb = require('mariadb');
const Config = require('../configs/config');

if (Config.unitTest) {
    module.exports = {
        pool: {
            query: (query, params) => {
                return Promise.resolve();
            }
        }
    };
} else {
    module.exports = {
        pool: {
            query: async (query, params) => {
                return mariadb.createConnection({
                    host: Config.database.host,
                    user: Config.database.user,
                    password: Config.database.password,
                    allowPublicKeyRetrieval: true
                }).then(conn => {
                    return conn.query(query, params)
                        .then(rows => {
                            conn.end();
                            return rows;
                        });
                });
            }
        }
    };
}