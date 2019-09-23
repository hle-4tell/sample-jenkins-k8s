'use strict';

const request = require('request');

class Common {

    static doRequest(url) {
        return new Promise(function (resolve, reject) {
            request(url, function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    resolve(body);
                } else {
                    reject(error);
                }
            });
        });
    }

    static mapToObj(map) {
        const obj = {}
        for (let [k, v] of map)
            obj[k] = v
        return obj
    }
}

module.exports = Common;
