
module.exports = function (req, res, next) {
  // Get the trace id from the request
  if (req.headers['x-behave-trace-id'] !== undefined) {
    req.traceId = req.headers['x-behave-trace-id']
  }
  next()
}
