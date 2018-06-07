const LoggerV2 = require('./logger-v2')

function logResponse (req, res) {
  var tenantKey = req.query.tenantKey || 'undefined'
  const traceId = req.traceId || 'undefined'
  if (req.swagger && req.swagger.params.tenantKey) tenantKey = req.swagger.params.tenantKey.value || 'undefined'
  const level = res.statusCode >= 400 ? 'error' : 'info'

  LoggerV2[level](tenantKey, traceId, req.method, req._parsedUrl.pathname, res.statusCode, '(', req.traceId, ')')
}

module.exports = function (req, res, next) {
  if (res.headersSent) {
    logResponse(req, res)
  } else {
    res.on('finish', function () {
      logResponse(req, res)
    })
  }
  next()
}
