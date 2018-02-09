var request = require('request')
var RequestError = require('./request-error')

function tryParseJson (body) {
  try {
    return JSON.parse(body)
  } catch (e) {
    return body
  }
}

function tryParseJsonError (body, response) {
  const json = tryParseJson(body)
  return json.message ? json.message : response.statusMessage
}

function makeRequest (options, type) {
  return new Promise((resolve, reject) => {
    request[type](options, (error, response, body) => {
      // Check if we got an error
      if (error) {
        // Try to return the body first
        if (body) {
          reject(new RequestError(response ? response.statusCode : 500, tryParseJsonError(body, response)))
        } else {
          reject(new RequestError(response ? response.statusCode : 500, error))
        }
      } else {
        // Check if we have a response
        if (response !== undefined && response.statusCode !== undefined) {
          // Check if we have a valid status code
          if (response.statusCode >= 200 && response.statusCode <= 399) {
            // All ok
            resolve({response: response, body: tryParseJson(body)})
          } else {
            // Invalid status code, try to reject with body
            if (body) {
              reject(new RequestError(response.statusCode, tryParseJsonError(body, response)))
            } else {
              reject(new RequestError(response.statusCode, response.statusMessage))
            }
          }
        } else {
          reject(new RequestError(400, 'No response'))
        }
      }
    })
  })
}

module.exports.get = function (options) {
  return makeRequest(options, 'get', undefined)
}

module.exports.post = function (options) {
  return makeRequest(options, 'post')
}

module.exports.put = function (options) {
  return makeRequest(options, 'put')
}

module.exports.delete = function (options) {
  return makeRequest(options, 'delete')
}
