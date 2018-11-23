#!/usr/bin/env node
const dns = require('dns')
const os = require('os')
const { promisify } = require('util')

const pkg = require('../package.json')
const chalk = require('chalk')
const arg = require('arg')
const boxen = require('boxen')

const lookup = promisify(dns.lookup)

const systemServer = require('../')

const getHelp = () => chalk`
  {bold.cyan system-server} - Serves up local data (cpu, memory, disk etc) for a given machine
 
  {bold USAGE}
    {bold $} {cyan system-server} [OPTIONS]
    {bold $} {cyan system-server} --help
  
  {bold OPTIONS}
      -h, --help             Shows this help message
      -v, --version          Displays the current version of serve
      -d, --detached         Runs the server in the background, detached mode
      -p, --port {underline port}        Specify a port to listen on
`

;(async () => {
  let args = null

  try {
    args = arg({
      '--help': Boolean,
      '--version': Boolean,
      '--detach': Boolean,
      '--port': Number,
      '-d': '--detach',
      '-h': '--help',
      '-v': '--version',
      '-p': '--port'
    })
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }

  if (args['--help']) {
    console.log(getHelp())
    process.exit(1)
  }

  const port = args['--port'] || 8000

  let networkaddress
  try {
    const { address: ip } = await lookup(os.hostname())
    networkaddress = `http://${ip}:${port}`
  } catch (err) {
    console.error(`DNS looup failed: ${err.message}`)
  }

  let message = `${chalk.bold(`system-server`)} is running`
  message += `\n\n ${chalk.bold('IP on your Network: ')} ${networkaddress}`

  console.log(
    boxen(message, {
      padding: 1,
      borderColor: 'blue',
      margin: 1
    })
  )
  let server
  if (!args['--detach']) {
    server = systemServer.listen(port)
  } else {
    require('./daemon')
    process.exit(1)
  }
  process.on('exit', code => {
    server.close()
  })
})()
