const feed = async (root, args, ctx, info) => {
  const { filter, skip, first, orderBy } = args;
  let where = {}

  if (filter) {
    where = {
      OR: [
        { url_contains: filter },
        { description_contains: filter }
      ]
    }
  }

  const queriedLinks = await ctx.db.query.links(
    {
      where,
      skip,
      first,
      orderBy
    },
    `{ id }`
  )

  const linksConnection = await ctx.db.query.linksConnection(
    {},
    `{ aggregate { count } }`
  )

  return {
    count: linksConnection.aggregate.count,
    linkIds: queriedLinks.map(link => link.id)
  }
}

module.exports = {
  feed
}
