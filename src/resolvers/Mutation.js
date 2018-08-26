const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { appSecret } = require('../credentials')
const { getUserId } = require('../utils')

const post = (root, args, ctx, info) => {
  const userId = getUserId(ctx)

  return ctx.db.mutation.createLink({
    data: {
      title: args.title,
      url: args.url,
      postedBy: {
        connect:  {
          id: userId
        }
      }
    }
  }, info)
}

const signUp = async (root, args, ctx, info) => {
  const password = await bcrypt.hash(args.password, 10)
  const selectionSet = `{ id }`

  const user = await ctx.db.mutation.createUser({
    data: {
      ...args,
      password
    }
  }, selectionSet)

  const token = jwt.sign({ userId: user.id }, appSecret)

  return {
    token,
    user
  }
}

const login = async (root, args, ctx, info) => {
  const selectionSet = `{ id password }`

  const user = await ctx.db.query.user({
    where: {
      email: args.email
    }
  }, selectionSet)

  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)

  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, appSecret)

  return {
    token,
    user
  }
}

const vote = async (root, args, ctx, info) => {
  const userId = getUserId(ctx)

  const voteExists = await ctx.db.exists.Vote({
    user: {
      id: userId
    },
    link: {
      id: args.linkId
    }
  })

  if (voteExists) {
    throw new Error('Already voted for link')
  }

  return ctx.db.mutation.createVote({
    data: {
      user: {
        connect: {
          id: userId
        }
      },
      link: {
        connect: {
          id: args.linkId
        }
      }
    }
  }, info)
}

module.exports = {
  login,
  signUp,
  post,
  vote
}
