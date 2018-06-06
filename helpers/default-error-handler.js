const RequestError = require('./request-error')
const Logger = require('./logger')

module.exports = function (err, req, res, next) {
  try {
    Logger.error(
      err.message + ':', err.details || '',
      '\n   URL:', req.method, req.url,
      '\n   Host:', req.headers.host,
      '\n   Trace ID:', req.traceId,
      '\n   ', err.stack
    )

    // render the error page
    res.status(err.statusCode || 500)
    res.send({
      message: (err instanceof RequestError ? err.message : 'Internal Server Error'),
      traceId: req.traceId
    })
  } catch (e) {
    console.error(e)
    res.status(500)
    res.send({
      message: 'Internal Server Error',
      traceId: req.traceId
    })
  }
}
