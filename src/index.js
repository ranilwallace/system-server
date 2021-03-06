const fs = require('fs')
var path = require('path')
const { promisify } = require('util')
const fileExists = promisify(fs.exists)
const readFile = promisify(fs.readFile)
const mkDir = promisify(fs.mkdir)
var https = require('https')
const writeFile = promisify(fs.writeFile)
const { getAllData } = require('systeminformation')
const app = require('express')()
const { v4 } = require('uuid')

const { typeDefs } = require('../src/graphql/typeDefs')
const { GraphQLScalarType } = require('graphql');
const { ApolloServer } = require('apollo-server-express')

var results = []

const resolvers = {
  Query: {
    systemInformation: async () => {
      const uniqueID = await identify()
      return {_id: uniqueID, timestamp: Math.floor(Date.now() / 1000), ...results}
    },
  },
  IntToString: new GraphQLScalarType({
    name: 'IntToString',
    description: 'Custom scalar type that converts an Int more than 32 bits to a String',
    parseValue(value) {
      return value.toString()
    },
    serialize(value) {
      return value.toString()
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return ast.value.toString()
      }
      return null;
    },
  }),
};

const getResultsAsync = async () => {
  results = await getAllData();
}
getResultsAsync()


const apollo = new ApolloServer({ typeDefs, resolvers })
apollo.applyMiddleware({ app })


var options = {
  key: fs.readFileSync(__dirname + '/../ssl/server.key'),
  cert: fs.readFileSync(__dirname + '/../ssl/server.cert')
}

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

app.use('/', async (req, res) => {
  const uniqueID = await identify()
  try {
    const results = await getAllData()
    res.json({
      _id: uniqueID,
      timestamp: Math.floor(Date.now() / 1000),
      ...results
    })
  } catch (error) {
    res.end(error)
  }
})

var server = https.createServer(options, app);

export default server
