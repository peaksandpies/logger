/**
 * Logs with severity level in Google format.
 *
 * @param {string} level Google Severity Levels https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#LogSeverity
 * @param {any} message The message to log
 * @param {any[]} args enhanced data to log
 */
export function _log(level: string, message: any, ...args: any[]): void;
/**
 * Logs with severity level in Google format.
 *
 * @param {string} level Google Severity Levels https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#LogSeverity
 * @param {any} message The message to log
 * @param {any[]} args enhanced data to log
 */
export function _log(level: string, message: any, ...args: any[]): void;
/**
 * Handle message for Google.
 *
 * @param {any} message The message to log
 * @param {any[]} args enhanced data to log
 *
 * @returns {string} List of space separated message and args, strigified, with a max. of 1000.
 */
export function _handleMessage(message: any, ...args: any[]): string;
/**
 * Handle message for Google.
 *
 * @param {any} message The message to log
 * @param {any[]} args enhanced data to log
 *
 * @returns {string} List of space separated message and args, strigified, with a max. of 1000.
 */
export function _handleMessage(message: any, ...args: any[]): string;
/**
 * Log error.
 *
 * @param {any} message The message to log
 * @param {any[]} args enhanced data to log
 */
export function error(message: any, ...args: any[]): void;
/**
 * Log error.
 *
 * @param {any} message The message to log
 * @param {any[]} args enhanced data to log
 */
export function error(message: any, ...args: any[]): void;
/**
 * Log warning.
 *
 * @param {any} message The message to log
 * @param {any[]} args enhanced data to log
 */
export function warn(message: any, ...args: any[]): void;
/**
 * Log warning.
 *
 * @param {any} message The message to log
 * @param {any[]} args enhanced data to log
 */
export function warn(message: any, ...args: any[]): void;
/**
 * Log info.
 *
 * @param {any} message The message to log
 * @param {any[]} args enhanced data to log
 */
export function info(message: any, ...args: any[]): void;
/**
 * Log info.
 *
 * @param {any} message The message to log
 * @param {any[]} args enhanced data to log
 */
export function info(message: any, ...args: any[]): void;
/**
 * Log verbose.
 *
 * @param {any} message The message to log
 * @param {any[]} args enhanced data to log
 */
export function verbose(message: any, ...args: any[]): void;
/**
 * Log verbose.
 *
 * @param {any} message The message to log
 * @param {any[]} args enhanced data to log
 */
export function verbose(message: any, ...args: any[]): void;
/**
 * Log debug.
 *
 * @param {any} message The message to log
 * @param {any[]} args enhanced data to log
 */
export function debug(message: any, ...args: any[]): void;
/**
 * Log debug.
 *
 * @param {any} message The message to log
 * @param {any[]} args enhanced data to log
 */
export function debug(message: any, ...args: any[]): void;
/**
 * Log silly.
 *
 * @param {any} message The message to log
 */
export function silly(message: any): void;
/**
 * Log silly.
 *
 * @param {any} message The message to log
 */
export function silly(message: any): void;
