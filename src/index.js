const { getAllData } = require('systeminformation')
const app = require('express')()

//const { typeDefs, resolvers } = require('./gqlConfigTBD');
const { indentify } = require('../src/indentify');

const { ApolloServer, gql } = require('apollo-server-express');


var results = [];
const uniqueID = indentify();

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    base: Information
  }

  type Information {
    _id: String,
    version: String,
    system: System,
    bios: Bios,
    baseboard: Baseboard,
    os: OS,
    versions: Versions,
    node: String,
    v8: String,
    inetLatency: Float
  }

  type System{
    manufacturer: String,
    model: String,
    version: Float,
    serial: String,
    uuid: String,
    sku: String
  }

  type Bios {
    vendor: String,
    version: String,
    releaseDate: String,
    revision: String
  }

  type Baseboard {
    manufacturer: String,
    model: String,
    version: Float,
    serial: String,
    assetTag: String
  }

  type OS {
    platform: String,
    distro: String,
    release: String,
    codename: String,
    kernel: String,
    arch: String,
    hostname: String,
    logofile: String
  }

  type Versions{
    kernel: String,
    openssl: String,
    node: String,
    v8: String,
    npm: String,
    yarn: String,
    pm2: String,
    gulp: String,
    grunt: String,
    git: String,
    tsc: String,
    mysql: String,
    redis: String,
    mongodb: String,
    nginx: String,
    php: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    base: () => {
      return {_id: uniqueID, ...results};
    },
  },
};


function getSysInfo(){
  getAllData().then((value) => {
    results = value;
  }, (reason) => {
    results = [];
    console.log(reason);
  });
}

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });
getSysInfo();

app.use('/', async (req, res) => {
  try {
    res.json({
      _id: uniqueID,
      timestamp: Math.floor(Date.now() / 1000),
      ...results
    })
  } catch (error) {
    res.end(error)
  }
})


export default app
