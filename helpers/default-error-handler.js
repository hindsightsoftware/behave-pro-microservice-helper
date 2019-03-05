const { log } = require('@hindsightsoftware/winston-express')
const RequestError = require('./request-error')
const LoggerV2 = require('./logger-v2')
const { isEmpty } = require('./utils')

module.exports = function (err, req, res, next) {
  try {
    var tenantKey = req.query.tenantKey || 'undefined'
    const traceId = req.traceId || 'undefined'
    if (req.swagger && req.swagger.params.tenantKey) tenantKey = req.swagger.params.tenantKey.value || 'undefined'

    LoggerV2.error(
      tenantKey, traceId,
      err.message + ' ', err.details || '', err.code || '', err.results ? JSON.stringify(err.results) : '',
      '\n   Tenant:', tenantKey,
      '\n   URL:', req.method, req.url,
      '\n   Host:', req.headers.host,
      '\n   Trace ID:', req.traceId,
      '\n   ', err.stack
    )

    const logLevel = res.stack >= 500 ? 'error' : 'warn';
    log.log(logLevel, 'default-error-handler', { err, tenantKey, traceId })

    // render the error page
    if (err.message.indexOf('Invalid content type') >= 0 || err.code !== undefined) {
      res.status(400)
      res.send({
        message: 'Request validation failed',
        traceId: req.traceId
      })
    } else {
      res.status(err.statusCode || 500)
      res.send({
        message: (err instanceof RequestError ? err.message : 'Internal Server Error'),
        traceId: req.traceId,
        params: (err.params && !isEmpty(err.params) ? err.params : undefined)
      })
    }
  } catch (e) {
    console.error(e)
    res.status(500)
    res.send({
      message: 'Internal Server Error',
      traceId: req.traceId
    })
  }
}
