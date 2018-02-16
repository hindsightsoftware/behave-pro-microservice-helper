var routes = require('./routes')
var http = require('./http')

const hooks = {
  'update-tags': {
    actions: [
      function (traceId, data) {
        return http.put({
          url: `${routes.INTERNAL_TAG_CACHE}`,
          json: data,
          headers: {
            'x-behave-trace-id': traceId
          }
        })
      },
      function (traceId, data) {
        // Another empty webhook
        return Promise.resolve()
      }
    ]
  }
}

module.exports.trigger = function (traceId, name, data) {
  if (!(name in hooks)) {
    console.error(`ERROR Trace-ID: ${traceId} WebHook: ${name} does not exist!`)
  } else {
    const found = hooks[name]
    found.actions.map(action => {
      action(traceId, data).catch(err => {
        console.error(`ERROR Trace-ID: ${traceId} WebHook: ${name} Message: ${err.message}`)
      })
    })
  }
}

module.exports.updateTags = function (traceId, data) {
  module.exports.trigger(traceId, 'update-tags', data)
}
