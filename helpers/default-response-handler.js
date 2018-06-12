const LoggerV2 = require('./logger-v2')

function logResponse (req, res) {
  var tenantKey = req.query.tenantKey || ''
  const traceId = req.traceId || ''
  if (req.swagger && req.swagger.params.tenantKey) tenantKey = req.swagger.params.tenantKey.value || ''
  const level = res.statusCode >= 400 ? 'error' : 'info'

  LoggerV2[level](tenantKey, traceId, req.method, req._parsedUrl.pathname, res.statusCode)
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
