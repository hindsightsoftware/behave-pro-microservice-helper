module.exports = class RequestError extends Error {
  constructor (code, message, details) {
    super(message)
    this.statusCode = code
    this.details = details
  }
}
