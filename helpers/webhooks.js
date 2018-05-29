var routes = require('./routes')
var http = require('./http')

const WEBHOOKS = {
  'feature': [
    routes.INTERNAL_TAG_CACHE_WEBHOOK,
    routes.INTERNAL_NAME_CACHE_WEBHOOK,
    routes.INTERNAL_ISSUE_MANAGER_WEBHOOK
  ],
  'scenario': [
    routes.INTERNAL_TAG_CACHE_WEBHOOK,
    routes.INTERNAL_NAME_CACHE_WEBHOOK,
    routes.INTERNAL_STEP_CACHE_WEBHOOK,
    routes.INTERNAL_ISSUE_MANAGER_WEBHOOK
  ],
  'issue': [
    routes.INTERNAL_FEATURES_WEBHOOK
  ]
}

module.exports.trigger = function (traceId, name, action, tenantKey, projectId, data) {
  if (tenantKey === null || tenantKey === undefined) {
    console.error(`ERROR Trace-ID: ${traceId} webhook: ${name} project is undefined or null!`)
  } else if (!(name in WEBHOOKS)) {
    console.error(`ERROR Trace-ID: ${traceId} webhook: ${name} does not exist!`)
  } else {
    const found = WEBHOOKS[name]
    found.map(route => {
      http.post({
        url: `${route}?tenantKey=${encodeURIComponent(tenantKey)}&projectId=${projectId}`,
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

module.exports.triggerBulk = function (traceId, name, tenantKey, projectId, actions) {
  if (tenantKey === null || tenantKey === undefined) {
    console.error(`ERROR Trace-ID: ${traceId} webhook: ${name} project is undefined or null!`)
  } else if (!(name in WEBHOOKS)) {
    console.error(`ERROR Trace-ID: ${traceId} webhook: ${name} does not exist!`)
  } else {
    const found = WEBHOOKS[name]
    found.map(route => {
      http.post({
        url: `${route}/bulk?tenantKey=${encodeURIComponent(tenantKey)}&projectId=${projectId}`,
        json: {
          name: name,
          actions: actions
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

module.exports.featureEvent = function (traceId, action, tenantKey, projectId, data) {
  module.exports.trigger(traceId, 'feature', action, tenantKey, projectId, data)
}

module.exports.scenarioEvent = function (traceId, action, tenantKey, projectId, data) {
  module.exports.trigger(traceId, 'scenario', action, tenantKey, projectId, data)
}

module.exports.issueEvent = function (traceId, action, tenantKey, projectId, data) {
  module.exports.trigger(traceId, 'issue', action, tenantKey, projectId, data)
}
