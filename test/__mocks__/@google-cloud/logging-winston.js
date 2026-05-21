'use strict'

class LoggingWinston {
  constructor(options) {
    this.options = options
    this.name = 'LoggingWinston'
  }
  log(info, callback) {
    if (callback) callback()
  }
}

module.exports = {
  LoggingWinston,
}
