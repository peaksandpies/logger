/**
 * Safely stringify a JSON.
 *
 * @param {any} thing
 * @returns {string}
 */
function safeStringify (thing) {
  try {
    return JSON.stringify(thing)
  } catch (err) {
    return err.message
  }
}

/**
 * Multi args message.
 *
 * @param {any} message The message to log
 * @param {any[]} args enhanced data to log
 *
 * @returns {string} List of space separated message and args, strigified, with a max. of 1000.
 */
const handleMessage = function (message, args) {
  const maxLength = 1000
  args = args || []
  message = [message]
  return [...message, ...args].map(el => typeof el === 'string' ? el : safeStringify(el)).join(' ').slice(0, maxLength)
}

module.exports = {
  handleMessage
}
