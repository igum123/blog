const UsersRoute = require('./modules/users/users.router');
const BlogRoute = require('./modules/blog/blog.router');

/**
 * Set all route
 * @constructor
 * @param {string} app - App object from express
 */
function setupRoutes(app) {
    app.use(UsersRoute);
    app.use(BlogRoute);
}

module.exports = {
    setupRoutes
};