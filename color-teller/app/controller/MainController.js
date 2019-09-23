'use strict';
require('dotenv').load();

class MainController {

	main(req, resp) {
		let color = process.env.COLOR || 'black';
		resp.status(200).send({ 'color': color });
	}

	ping(req, resp) {
		resp.status(200).send({ 'status': 'ok' });
	}
}

module.exports = new MainController();
