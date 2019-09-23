'use strict';

module.exports = {
    SERVER_ERROR: {
        httpCode: 500,
        message: {
            'code': '000111',
            'consequence': 'Cannot Respond',
            'reason': 'Server Error',
            'resolution': 'An error occurred'
        }
    },
    NOT_FOUND: {
        httpCode: 404,
        message: {
            'code': '000117',
            'consequence': 'Cannot Respond',
            'reason': 'Requested operation/resource unknown',
            'resolution': 'Submit request to a known operation/resource'
        }
    }
};
