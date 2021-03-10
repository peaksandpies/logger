const logger = {
    /**
     * Logs with severity level in Google format.
     *
     * @param {string} level Google Severity Levels https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#LogSeverity
     * @param {any} message The message to log
     * @param {any[]} args enhanced data to log
     */
    _log (level, message, ...args) {
      const logObj = {
        severity: level,
        message: this._handleMessage(message, ...args),
        timestamp: new Date().toISOString()
      }
      
      if (process.env.NODE_ENV === 'test') {
        console.log(`${logObj.timestamp} - ${logObj.severity} -- ${logObj.message}`)
      } else {
        const logStringified = JSON.stringify(logObj)
        console.log(logStringified)
      }
    },
  
    /**
     * Handle message for Google.  
     *
     * @param {any} message The message to log
     * @param {any[]} args enhanced data to log
     * 
     * @returns {string} List of space separated message and args, strigified, with a max. of 1000.
     */
    _handleMessage (message, ...args) {
      const maxLength = 1000
      return [ message, ...args ].map(el => typeof el === 'string' ? el : JSON.stringify(el)).join(' ').slice(0, maxLength)
    },
  
    /**
     * Log error.
     *
     * @param {any} message The message to log
     * @param {any[]} args enhanced data to log
     */
    error (message, ...args) { this._log('ERROR', message, ...args) },
  
    /**
     * Log warning.
     *
     * @param {any} message The message to log
     * @param {any[]} args enhanced data to log
     */
    warn (message, ...args) { this._log('WARNING', message, ...args) },
  
    /**
     * Log info.
     *
     * @param {any} message The message to log
     * @param {any[]} args enhanced data to log
     */
    info (message, ...args) { this._log('INFO', message, ...args) },
  
    /**
     * Log verbose.
     *
     * @param {any} message The message to log
     * @param {any[]} args enhanced data to log
     */
    verbose (message, ...args) {
      if (process.env.VERBOSE) {
        this._log('VERBOSE', message, ...args)
      }
    },
  
    /**
     * Log debug.
     *
     * @param {any} message The message to log
     * @param {any[]} args enhanced data to log
     */
    debug (message, ...args) {
      if (process.env.NODE_ENV === 'test') {
        this._log('DEBUG', message, ...args)
      }
    },
  
    /**
     * Log silly.
     *
     * @param {any} message The message to log
     */
    silly (message) {
      process.stdout.write(message + '\n')
    }
  }
  
  module.exports = logger
  