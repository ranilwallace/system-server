const systemServer = require('../')

module.exports = (() => {
  let args = process.argv
  systemServer.listen(args[2])
})()
