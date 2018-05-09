const chalk = require('chalk')
const net = require('net')
const util = require('util')

var dataDogClient = null
var dataDogServiceName = null

function sendData (label, ...args) {
  if (dataDogClient != null) {
    const data = {
      message: util.format(...args),
      level: label,
      service: dataDogServiceName || 'nodejs'
    }
    dataDogClient.write(JSON.stringify(data) + '\n')
  }
}

function prettyPrint (logType, label, color, ...args) {
  console[logType](chalk.grey(new Date().toISOString()), chalk[color]('[' + label + ']'), chalk[color](...args))
}

module.exports.emerg = function (...args) { // syslog 0
  prettyPrint('error', 'EMERGENCY', 'red', ...args)
  sendData('EMERGENCY', ...args)
}

module.exports.alert = function (...args) { // syslog 1
  prettyPrint('error', 'ALERT', 'red', ...args)
  sendData('ALERT', ...args)
}

module.exports.crit = function (...args) { // syslog 2
  prettyPrint('error', 'CRITICAL', 'red', ...args)
  sendData('CRITICAL', ...args)
}

module.exports.error = function (...args) { // syslog 3
  prettyPrint('error', 'ERROR', 'red', ...args)
  sendData('ERROR', ...args)
}

module.exports.warn = function (...args) { // syslog 4
  prettyPrint('warn', 'WARNING', 'yellow', ...args)
  sendData('WARNING', ...args)
}

module.exports.notice = function (...args) { // syslog 5
  prettyPrint('log', 'NOTICE', 'white', ...args)
  sendData('NOTICE', ...args)
}

module.exports.info = function (...args) { // syslog 6
  prettyPrint('log', 'INFO', 'white', ...args)
  sendData('INFO', ...args)
}

module.exports.debug = function (...args) { // syslog 7
  prettyPrint('log', 'DEBUG', 'grey', ...args)
  sendData('DEBUG', ...args)
}

module.exports.init = function (host, port, serviceName) {
  dataDogClient = new net.Socket()
  dataDogServiceName = serviceName
  dataDogClient.connect(port, host, function () {
    prettyPrint('log', 'INFO', 'grey', 'Connected to DataDog Log Agent at', host + ':' + port)
  })
  dataDogClient.on('error', function (err) {
    prettyPrint('error', 'ERROR', 'red', err)
  })
}
