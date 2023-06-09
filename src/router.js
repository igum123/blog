const UsersRoute = require('./modules/users/users.router');
const BlogRoute = require('./modules/blog/blog.router');
const NewslettersRoute = require('./modules/newsletters/newsletters.router');

/**
 * Set all route
 * @constructor
 * @param {string} app - App object from express
 */
function setupRoutes(app) {
    app.use(UsersRoute);
    app.use(BlogRoute);
    app.use(NewslettersRoute);
}

module.exports = {
    setupRoutes
};