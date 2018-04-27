const chalk = require('chalk')

function prettyPrint (logType, label, color, ...args) {
  console[logType](chalk.grey(new Date().toISOString()), chalk[color]('[' + label + ']'), chalk[color](...args))
}

module.exports.debug = function (...args) {
  prettyPrint('log', 'DEBUG', 'grey', ...args)
}

module.exports.info = function (...args) {
  prettyPrint('log', 'INFO', 'white', ...args)
}

module.exports.warn = function (...args) {
  prettyPrint('warn', 'WARNING', 'yellow', ...args)
}

module.exports.error = function (...args) {
  prettyPrint('error', 'ERROR', 'red', ...args)
}
