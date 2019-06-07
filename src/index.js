const { getAllData } = require('systeminformation')
const app = require('express')()
const { v4 } = require('uuid')

const { typeDefs } = require('../src/graphql/typeDefs');
import { GraphQLScalarType } from 'graphql';
const { ApolloServer } = require('apollo-server-express');

var results = [];

const resolvers = {
  Query: {
    systemInformation: () => {
      return {_id: v4(), ...results};
    },
  },
  IntToString: new GraphQLScalarType({
    name: 'IntToString',
    description: 'Custom scalar type that converts an Int more than 32 bits to a String',
    parseValue(value) {
      return value.toString();
    },
    serialize(value) {
      return value.toString();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return ast.value.toString();
      }
      return null;
    },
  }),
};

const getResultsAsync = async () => {
  results = await getAllData();
}
getResultsAsync();



const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });



app.use('/', async (req, res) => {
  const results = await getAllData();
  try {
    res.json({
      _id: v4(),
      timestamp: Math.floor(Date.now() / 1000),
      ...results
    })
  } catch (error) {
    res.end(error)
  }
})


export default app
