module.exports = {
    port: process.env.PORT || 5001,
    log: {
      format: 'combined',
      transports: {
        file: {
          level: 'debug',
          filename: './logs/applog.log',
          handleExceptions: true,
          json: false,
          maxsize: 5242880, // 5MB
          colorize: false
        },
        console: {
          level: 'debug',
          handleExceptions: true,
          json: false,
          colorize: true,
          timestamp: true
        }
      }
    }
  };
  