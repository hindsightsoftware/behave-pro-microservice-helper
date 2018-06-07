const chalk = require('chalk')
const net = require('net')
const util = require('util')

function sendData (label, tenantKey, traceId, ...args) {
  if (global.dataDogClient) {
    const data = {
      message: util.format(...args),
      tenantKey: tenantKey,
      traceId: traceId,
      level: label,
      service: global.dataDogServiceName || 'nodejs'
    }
    global.dataDogClient.write(JSON.stringify(data) + '\n')
  }
}

function prettyPrint (logType, label, color, ...args) {
  console[logType](chalk.grey(new Date().toISOString()), chalk[color]('[' + label + ']'), chalk[color](...args))
}

module.exports.emerg = function (tenantKey, traceId, ...args) { // syslog 0
  prettyPrint('error', 'EMERGENCY', 'red', ...args)
  sendData('EMERGENCY', tenantKey, traceId, ...args)
}

module.exports.alert = function (tenantKey, traceId, ...args) { // syslog 1
  prettyPrint('error', 'ALERT', 'red', ...args)
  sendData('ALERT', tenantKey, traceId, ...args)
}

module.exports.crit = function (tenantKey, traceId, ...args) { // syslog 2
  prettyPrint('error', 'CRITICAL', 'red', ...args)
  sendData('CRITICAL', tenantKey, traceId, ...args)
}

module.exports.error = function (tenantKey, traceId, ...args) { // syslog 3
  prettyPrint('error', 'ERROR', 'red', ...args)
  sendData('ERROR', tenantKey, traceId, ...args)
}

module.exports.warn = function (tenantKey, traceId, ...args) { // syslog 4
  prettyPrint('warn', 'WARNING', 'yellow', ...args)
  sendData('WARNING', tenantKey, traceId, ...args)
}

module.exports.notice = function (tenantKey, traceId, ...args) { // syslog 5
  prettyPrint('log', 'NOTICE', 'white', ...args)
  sendData('NOTICE', tenantKey, traceId, ...args)
}

module.exports.info = function (tenantKey, traceId, ...args) { // syslog 6
  prettyPrint('log', 'INFO', 'white', ...args)
  sendData('INFO', tenantKey, traceId, ...args)
}

module.exports.debug = function (tenantKey, traceId, ...args) { // syslog 7
  prettyPrint('log', 'DEBUG', 'grey', ...args)
  sendData('DEBUG', tenantKey, traceId, ...args)
}

module.exports.init = function (host, port, serviceName) {
  global.dataDogClient = new net.Socket()
  global.dataDogServiceName = serviceName
  global.dataDogClient.connect(port, host, function () {
    prettyPrint('log', 'INFO', 'grey', 'Connected to DataDog Log Agent at', host + ':' + port)
  })
  global.dataDogClient.on('error', function (err) {
    prettyPrint('error', 'ERROR', 'red', err)
  })
}
