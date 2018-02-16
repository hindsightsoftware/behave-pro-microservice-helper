var routes = require('./routes')
var http = require('./http')

function encodeQueryData (data) {
  let ret = []
  for (let d in data) {
    if (data[d] !== undefined) {
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]))
    }
  }
  return ret.join('&')
}

const hooks = {
  'update-tags': {
    actions: [
      function (traceId, query, data) {
        const params = encodeQueryData(query)
        return http.put({
          url: `${routes.INTERNAL_TAG_CACHE}?${params}`,
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

module.exports.trigger = function (traceId, name, query, data) {
  if (!(name in hooks)) {
    console.error(`ERROR Trace-ID: ${traceId} WebHook: ${name} does not exist!`)
  } else {
    const found = hooks[name]
    found.actions.map(action => {
      action(traceId, query, data).catch(err => {
        console.error(`ERROR Trace-ID: ${traceId} WebHook: ${name} Message: ${err.message}`)
      })
    })
  }
}

module.exports.updateTags = function (traceId, query, data) {
  module.exports.trigger(traceId, 'update-tags', query, data)
}
