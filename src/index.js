const fs = require('fs')
var path = require('path')
const { v4 } = require('uuid')
const { promisify } = require('util')
const fileExists = promisify(fs.exists)
const readFile = promisify(fs.readFile)
const mkDir = promisify(fs.mkdir)
const writeFile = promisify(fs.writeFile)
const { getAllData } = require('systeminformation')
const app = require('express')()

const identify = async () => {
  const homedir = require('os').homedir()
  const filePath = path.normalize(homedir + '/.system-server/.uuid')
  try {
    const exists = await fileExists(filePath)

    if (exists) {
      const file = await readFile(filePath)
      return file.toString()
    } else {
      var id = v4()
      await mkDir(homedir + '/.system-server/')
      await writeFile(filePath, id)
      return id
    }
  } catch (error) {
    console.error(error)
  }
}

const fs = require('fs');

var options = {
  key: fs.readFileSync(__dirname + '/../ssl/server.key'),
  cert: fs.readFileSync(__dirname + '/../ssl/server.cert')
}

app.use('/', async (req, res) => {
  const uniqueID = await identify();
  try {
    const results = await getAllData();
    res.json({
      id: uniqueID,
      timestamp: Math.floor(Date.now() / 1000),
      ...results
    })
  } catch (error) {
    res.end(error)
  }
})

var server = https.createServer(options, app);

export default server
