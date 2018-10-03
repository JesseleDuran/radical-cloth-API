'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')
class UserController {

    async register ({request, response, auth}) {
        const userInfo = request.only(['username', 'password', 'email'])

        const user = new User()
        user.admin = false
        user.username = userInfo.username
        user.password = userInfo.password
        user.email = userInfo.email

        try {
            await user.save()
            let token = await auth.attempt(userInfo.username, userInfo.password)
            return response.status(201).json({"auth":token, "user": user})
        } catch (error) {
            return response.status(401).send({"error": error.message})
        }
    }

    async login ({request, auth, response}) {

        const userInfo = request.only(['username', 'password'])
        const user = await User.query().where('username', userInfo.username).first()
        if(user) {
            const isPasswordVerified = await Hash.verify(userInfo.password, user.password)
            if (isPasswordVerified) {
                let token = await auth.attempt(userInfo.username, userInfo.password)
                return response.status(201).json({"auth":token, "user": user})
            }
        }

        return response.status(422).json({"message": "incorrect credentials"})
    }

    async logout ({auth, response}) {

        await auth.logout()

        return response.status(201).json({"success": true})
    }

}

module.exports = UserController
