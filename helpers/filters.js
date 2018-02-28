module.exports.pick = function (map, keys) {
  return keys.reduce((a, e) => (a[e] = map[e], a), {})
}
