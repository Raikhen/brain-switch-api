const links = (root, args, ctx, info) => {
  return ctx.db.query.links({
    where: {
      id_in: root.linkIds
    }
  }, info)
}

module.exports = {
  links
}
