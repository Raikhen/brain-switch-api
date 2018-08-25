const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const { secret } = require('./credentials')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')

const resolvers = {
  Query,
  Mutation,
  AuthPayload
}

const server = new GraphQLServer({
  resolvers,
  typeDefs: './src/schema.graphql',
  context(req) {
    return {
      ...req,
      db: new Prisma({
        secret,
        typeDefs: 'src/generated/prisma.graphql',
        endpoint: 'https://eu1.prisma.sh/dylan-7e15c4/database/dev'
      })
    }
  }
})

server.start(() => console.log(`Server running at http://localhost:4000`))
