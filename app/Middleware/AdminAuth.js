'use strict'

class AdminAuth {
  async handle ({ response, auth }, next, ) {
    try {
      if(auth.user.admin) {
        await next()
      }
    } catch (error) {
      return response.status(408).json({error: error.message})
    }
      
  }
}

module.exports = AdminAuth
