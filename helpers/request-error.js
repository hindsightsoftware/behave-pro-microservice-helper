module.exports = class RequestError extends Error {
  constructor (code, message, details, params = {}) {
    super(message)
    this.statusCode = code
    this.details = details
    this.params = params
  }
}
