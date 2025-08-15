/**
 * Safely stringify a JSON.
 *
 * @param {any} thing
 * @returns {string}
 */
function safeStringify(thing) {
  try {
    return JSON.stringify(thing)
  } catch (err) {
    return err.message
  }
}

/**
 * Multi args message.
 *
 * @param {any} level The log level to log
 * @param {any} message The message to log
 * @param {any[]} args enhanced data to log
 *
 * @returns {string} List of space separated message and args, strigified, with a max. of 1000.
 */
const handleMessage = function (level, message, args) {
  const levelsNotToSlice = ['verbose', 'debug', 'silly']
  const maxLength = 1000
  args = args || []
  message = [message]

  let result = [...message, ...args]
    .map((el) => (typeof el === 'string' ? el : safeStringify(el)))
    .join(' ')
  if (!levelsNotToSlice.includes(level.toLowerCase())) {
    result = result.slice(0, maxLength)
  }
  return result
}

module.exports = {
  handleMessage,
}
