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

module.exports.trigger = function (traceId, name, action, project, data) {
  if (project === null || project === undefined) {
    console.error(`ERROR Trace-ID: ${traceId} webhook: ${name} project is undefined or null!`)
  } else if (!(name in WEBHOOKS)) {
    console.error(`ERROR Trace-ID: ${traceId} webhook: ${name} does not exist!`)
  } else {
    const found = WEBHOOKS[name]
    found.map(route => {
      http.post({
        url: `${route}?project=${project}`,
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

module.exports.featureEvent = function (traceId, action, project, data) {
  module.exports.trigger(traceId, 'feature', action, project, data)
}

module.exports.scenarioEvent = function (traceId, action, project, data) {
  module.exports.trigger(traceId, 'scenario', action, project, data)
}
