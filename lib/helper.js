/**
 * Safely stringify a JSON.
 *
 * @param {any} thing
 * @returns {string}
 */
function safeStringify(thing) {
  try {
    if (thing instanceof Error) {
      return JSON.stringify(thing, Object.getOwnPropertyNames(thing))
    }
    return JSON.stringify(thing)
  } catch (err) {
    return err.message
  }
}

/**
 * Detect the current runtime environment based on standard environment variables.
 */
const detectRuntime = () => {
  if (process.env.NODE_RUN) {
    return process.env.NODE_RUN
  }

  // Google Cloud Functions / Cloud Run set K_SERVICE
  if (process.env.K_SERVICE) {
    return 'cloud-function'
  }

  // Kubernetes sets KUBERNETES_SERVICE_HOST
  if (process.env.KUBERNETES_SERVICE_HOST) {
    return 'kubernetes'
  }

  return 'local'
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
  detectRuntime,
  safeStringify,
}
