const jwt = require('jsonwebtoken')
const { appSecret } = require('./credentials')

const getUserId = (ctx) => {
  const auth = ctx.request.get('Authorization')

  if (auth) {
    const token = auth.replace('Bearer ', '')
    const { userId } = jwt.verify(token, appSecret)
    return userId
  }

  throw new Error('Not authenticated')
}

module.exports = {
  getUserId
}
