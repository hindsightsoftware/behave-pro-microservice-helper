const RawTextFile = require('./raw-text-file')

// The wrapper around promise and express router
module.exports = class PromiseRouter {
  constructor (router) {
    this.router = router
  }

  get (path, func) {
    this.wrapper('get', path, func)
  }

  put (path, func) {
    this.wrapper('put', path, func)
  }

  delete (path, func) {
    this.wrapper('delete', path, func)
  }

  post (path, func) {
    this.wrapper('post', path, func)
  }

  wrapper (method, path, func) {
    this.router[method](path, (req, res, next) => {
      func(req.traceId, req.query, req.body).then(result => {
        if (result instanceof RawTextFile) {
          res.setHeader('Content-Disposition', 'attachment; ' + result.fileName)
          res.setHeader('Content-type', 'text/plain')
          res.charset = 'UTF-8'
          res.write(result.contents)
          res.end()
        } else {
          res.status(200).send(result)
        }
      }).catch(err => {
        next(err)
      })
    })
  }

  mw () {
    return this.router
  }
}
