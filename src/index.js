const { GraphQLServer } = require('graphql-yoga')

let links = [{
  id: 'link-0',
  title: 'Fullstack tutorial for GraphQL',
  url: 'www.howtographql.com'
}]

const resolvers = {
  Query: {
    feed() {
      return links
    },
    link(root, args) {
      // TODO:
      // Check if it's okay to not respond with errors if there's no link.
      // If not okay, also change in delete and update.

      const linkAsArray = links.filter(link => link.id == args.id)
      if (!linkAsArray) return null
      return linkAsArray[0]
    }
  },
  Mutation: {
    post(root, args) {
      const link = {
        id: `link-${links.length}`,
        title: args.title,
        url: args.url
      }

      links.push(link)
      return link
    },
    updateLink(root, args) {
      let linkAsArray = links.filter(link => link.id == args.id)
      if (!linkAsArray) return null
      let link = linkAsArray[0]

      link = {
        ...link,
        title: args.title || link.title,
        url: args.url || link.url,
      }

      links = [
        ...links.filter(link => link.id != args.id),
        link
      ]

      return link
    },
    deleteLink(root, args) {
      const linkAsArray = links.filter(link => link.id == args.id)
      if (!linkAsArray) return null
      links = links.filter(link => link.id != args.id)
      return linkAsArray[0]
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.start(() => console.log(`Server running at http://localhost:4000`))
