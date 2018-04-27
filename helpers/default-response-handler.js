const Logger = require('./logger')

module.exports = function (req, res, next) {
  if (res.headersSent) {
    Logger.info(req.method, req._parsedUrl.pathname, res.statusCode, '(', req.traceId, ')')
  } else {
    res.on('finish', function () {
      Logger.info(req.method, req._parsedUrl.pathname, res.statusCode, '(', req.traceId, ')')
    })
  }
  next()
}
