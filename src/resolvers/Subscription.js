const newLinkSubscribe = (root, args, ctx, info) => {
  return ctx.db.subscription.link({
    where: {
      mutation_in: ['CREATED']
    }
  }, info)
}

const newLink = {
  subscribe: newLinkSubscribe
}

const newVoteSubscribe = (root, args, ctx, info) => {
  return ctx.db.subscription.vote({
    where: {
      mutation_in: ['CREATED']
    }
  }, info)
}

const newVote = {
  subscribe: newVoteSubscribe
}

module.exports = {
  newLink,
  newVote
}
