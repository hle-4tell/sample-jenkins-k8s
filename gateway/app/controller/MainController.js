'use strict';

const request = require('request');
const Common = require('../config/Common');
let map = new Map();

class MainController {

	async main(req, resp) {

		let colorEndpoint = process.env.COLOR_ENDPOINT;
		if (!colorEndpoint) {
			throw new Error('colorEndpoint is not set');
		}
		try {
			let result = await Common.doRequest('http://' + colorEndpoint);
			result = JSON.parse(result);
			const value = map.get(result.color);
			if (!value) {
				map.set(result.color, 1);
			} else {
				map.set(result.color, value + 1);
			}
			resp.status(200).send({ 'color': Common.mapToObj(map) });
		} catch (error) {
			resp.status(500).send({ 'error': 'failed to connect to endpoint: ' + error });
		}
	}

	clear(req, resp) {
		map.clear();
		resp.status(200).send({ 'status': 'cleared' });
	}

	ping(req, resp) {
		resp.status(200).send({ 'status': 'ok' });
	}
}

module.exports = new MainController();
