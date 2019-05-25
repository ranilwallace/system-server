const forever = require('forever-monitor')
const { resolve, join } = require('path')

module.exports = (port = 8000) => {
  var child = new forever.Monitor(resolve(join(__dirname, './start.js')), {
    max: 3,
    args: [port]
  })
  child.on('exit', function(code) {
    console.log('system server has exited after 3 restarts')
  })
  child.start()
}
