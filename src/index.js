const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const { secret } = require('./credentials')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const AuthPayload = require('./resolvers/AuthPayload')
const Feed = require('./resolvers/Feed')

const resolvers = {
  Query,
  Mutation,
  Subscription,
  AuthPayload,
  Feed
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
