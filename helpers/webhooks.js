var routes = require('./routes')
var http = require('./http')

const WEBHOOKS = {
  'feature': [
    routes.INTERNAL_TAG_CACHE_WEBHOOK,
    routes.INTERNAL_NAME_CACHE_WEBHOOK
  ],
  'scenario': [
    routes.INTERNAL_TAG_CACHE_WEBHOOK,
    routes.INTERNAL_NAME_CACHE_WEBHOOK,
    routes.INTERNAL_STEP_CACHE_WEBHOOK
  ]
}

module.exports.trigger = function (traceId, name, action, data) {
  if (!(name in WEBHOOKS)) {
    console.error(`ERROR Trace-ID: ${traceId} webhook: ${name} does not exist!`)
  } else {
    const found = WEBHOOKS[name]
    found.map(route => {
      http.post({
        url: route,
        json: {
          name: name,
          action: action,
          data: data
        },
        headers: {
          'x-behave-trace-id': traceId
        }
      }).catch(err => {
        console.error(`ERROR Trace-ID: ${traceId} webhook: ${name} Message: ${err.message}`)
      })
    })
  }
}

module.exports.featureEvent = function (traceId, action, data) {
  module.exports.trigger(traceId, 'feature', action, data)
}

module.exports.scenarioEvent = function (traceId, action, data) {
  module.exports.trigger(traceId, 'scenario', action, data)
}
