const systemServer = require('../')

module.exports = (port => {
  console.log(process.argv.length)
  systemServer.listen(process.argv.length > 4 ? port : process.argv[2])
})()
