require('dotenv').load();
const Config = require('./app/config/Config');
const Logger = require('./app/config/Logger');
const Application = require('./app/Application');
const app = new Application();

// Start the app by listening on <port>
app.app.listen(Config.port);

// Logging initialization
Logger.info('application started on port ' + Config.port);