const systemServer = require('../')

module.exports = (() => {
  let args = process.argv
  let server = systemServer.listen(args[2])
  process.on('exit', code => {
    server.close()
  })
})()
