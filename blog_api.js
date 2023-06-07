var DefaultSettings = require('./src/default'),
    Config = require('./src/configs/config'),
    Router = require('./src/router');

DefaultSettings.init(Config.port, (app) => {
    Router.setupRoutes(app);
});
