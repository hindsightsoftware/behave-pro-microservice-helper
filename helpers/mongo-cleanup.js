module.exports = function (connection, data) {
  return new Promise((resolve, reject) => {
    if (data) {
      var promises = []
      Object.keys(data).forEach(function (key) {
        promises.push(new Promise((resolve, reject) => {
          // Find collection
          connection.db.collection(key, function (err, collection) {
            if (err) throw err
            // Clean collection
            collection.remove({}, function (err) {
              if (err) throw err
              // Insert the database
              if (data[key]) {
                collection.insertMany(data[key], function (err, docs) {
                  if (err) throw err
                  resolve()
                })
              } else {
                resolve()
              }
            })
          })
        }))
      })
      // Wait until all data has been submitted
      Promise.all(promises).then(() => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    } else {
      // No data to restore
      resolve()
    }
  })
}
