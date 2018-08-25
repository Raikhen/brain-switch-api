const feed = (root, args, ctx, info) => {
  return ctx.db.query.links({}, info)
}

module.exports = {
  feed
}
