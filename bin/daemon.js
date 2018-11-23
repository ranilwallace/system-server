const forever = require('forever-monitor')
const { resolve } = require('path')

module.exports = port => {
  var child = new forever.Monitor(resolve('./bin/start.js'), {
    max: 3,
    args: [port]
  })
  child.on('exit', function(code) {
    console.log('system server has exited after 3 restarts')
  })
  child.start()
}
