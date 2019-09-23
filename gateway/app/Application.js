'use strict';

/**
 * Module dependencies.
 */
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const path = require('path');
const logger = require('../app/config/Logger');
const errorMessages = require('./error/ErrorMessages');
const baseRgx = /(.*).(js|coffee)$/;

class Application {

    constructor() {
        // Initialize express app
        this.app = express();

        // Showing stack errors
        this.app.set('showStackError', true);

        // CookieParser should be above session
        this.app.use(cookieParser());

        // Request body parsing middleware should be above methodOverride
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json({ type: 'application/*', limit: '50mb' }));
        this.app.use(methodOverride());

        // Use helmet to secure Express headers
        this.app.use(helmet.xframe());
        this.app.use(helmet.xssFilter());
        this.app.use(helmet.nosniff());
        this.app.use(helmet.ienoopen());
        this.app.disable('x-powered-by');

        //NOTE: routes config should be defined after all configurations
        this.bootstrapRoutes();

        this.app.use(this.handleError);

        // Assume 404 since no middleware responded
        this.app.use(this.handleNotFoundError);

        logger.info('completed configuring express application');
    }

    bootstrapRoutes() {
        // Skip the app/routes/middlewares directory as it is meant to be
        // used and shared by routes as further middlewares and is not a
        // route by itself
        const appPath = process.cwd();
        this.walk(appPath + '/app', 'route', 'middlewares', (path) => {
            logger.info('loading route ', path);
            new (require(path))(this.app);
        });
    }

    // recursively walk modules path and callback for each file
    walk(wpath, type, excludeDir, callback) {
        // slice type
        const stype = type.slice(-1) === 's' ? type.slice(0, -1) : type;
        const rgx = new RegExp('(.*)-' + stype + '.(js|coffee)$', 'i');
        if (!fs.existsSync(wpath)) return;
        fs.readdirSync(wpath).forEach((file) => {
            const newPath = path.join(wpath, file);
            const stat = fs.statSync(newPath);
            if (stat.isFile() && (rgx.test(file) || (baseRgx.test(file)) && newPath.indexOf(type) >= 0)) {
                // if (!rgx.test(file)) console.log('  Consider updating filename:', newPath);
                callback(newPath);
            } else if (stat.isDirectory() && file !== excludeDir && ~newPath.indexOf(type)) {
                this.walk(newPath, type, excludeDir, callback);
            }
        });
    };

    handleError(err, req, res, next) {
        // If the error object doesn't exists
        if (!err)
            return next();
        //logger.info(config);
        // Log it
        logger.error(err.stack);
        const serverError = err.error ? err.error : errorMessages.SERVER_ERROR;
        // Error page
        res.status(serverError.httpCode).send(serverError.message);
    }

    handleNotFoundError(req, res) {
        logger.error('request ' + req.path + ' not found');
        const notFound = errorMessages.NOT_FOUND;
        res.status(notFound.httpCode).json(notFound.message);
    }
}

module.exports = Application;
