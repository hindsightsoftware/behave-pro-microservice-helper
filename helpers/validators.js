var Joi = require('joi')
var RequestError = require('./request-error')

module.exports.checkQuery = function checkQuery (query, schema) {
  if (!query) {
    throw new RequestError(400, 'Request query is empty')
  } else {
    if (typeof query === 'object') {
      const result = Joi.validate(query, schema)
      if (result.error !== null) {
        throw new RequestError(400, result.error.name, result.error.details[0].message)
      } else {
        return true
      }
    } else {
      throw new RequestError(400, 'Expected query object')
    }
  }
}

module.exports.checkBody = function checkBody (body, schema) {
  if (!body) {
    throw new RequestError(400, 'Request body is empty')
  } else {
    if (typeof body === 'object') {
      const result = Joi.validate(body, schema)
      if (result.error !== null) {
        throw new RequestError(400, result.error.name, result.error.details[0].message)
      } else {
        return true
      }
    } else {
      throw new RequestError(400, 'Expected body object')
    }
  }
}
