'use strict';

const express = require('express');
const ctrl = require('../controller/MainController');
const router = express.Router();

class MainRouter {

	constructor(app) {
		router.route('/color').get(ctrl.main);
		router.route('/clear').get(ctrl.clear);
		router.route('/ping').get(ctrl.ping);
		app.use('/', router);
	}
}

module.exports = MainRouter;