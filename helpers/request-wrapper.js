
module.exports = function (req, res, next, func) {
  try {
    func(req).then(result => {
      if (result !== undefined && result !== null) res.status(200).send(result)
      else res.status(204).send()
    }).catch(err => {
      next(err)
    })
  } catch (err) {
    next(err)
  }
}
