const cookieParser = require('cookie-parser'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    express = require('express'),
    helmet = require('helmet'),
    cors = require('cors'),
    path = require('path');


const Authentication = require('./middlewares/authentification'),
    Config = require('./configs/config');


/**
* Set all route
* @constructor
* @param {number} port - Port number of the app
* @param {function} doSomethingWithApp - Function with the app parameters to setup route and other
*/
function init(port, doSomethingWithApp) {
    var app = express();

    if (Config.dev) {
        app.use(cors());
        process.on('uncaughtException', (error, source) => {
            console.log(process.stderr.fd, error, source);
        });
    }

    /*
    * Configure server for :
    *     - accept json and request param (bodyParser)
    *     - remove insecure informations header (helmet)
    *     - compress all data send to client (compression)
    *     - cookie for connection (cookieParser)
    */
    app.use(bodyParser.urlencoded({ extended: true, limit: '900000mb' }));
    app.use(bodyParser.json({
        limit: '90000mb',
        // Because Stripe needs the raw body, we compute it but only when hitting the Stripe callback URL.
        verify: function (req, res, buf) {
            var url = req.originalUrl;
            if (url.startsWith('/api/v1/webhook')) {
                req.rawBody = buf.toString()
            }
        }
    }));
    app.use(helmet());
    app.use(compression());
    app.use(cookieParser());
    app.use('/api/img', express.static(path.resolve(__dirname, '../img')));

    app.use('/api', Authentication.verifyToken);


    doSomethingWithApp(app);

    /*
    *  Run the server and set the port
    */
    app.listen(port, function () {
        console.log('App listening on port ' + port + '!');
    });
}

module.exports = {
    init
};