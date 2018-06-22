const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    try {
        const users = await User.find({})
        response.json(users)
    } catch (exception) {
        response.status(500).json({ 'error': 'server error' })
    }
})

usersRouter.post('/', async (request, response) => {
    try {
        const user = sanitiseNewUser(new User(request.body))
        const saltRound = 10
        user.password = await bcrypt.hash(user.password, saltRound)
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (exception) {
        response.status(500).json({ 'error': 'server error' })
    }
})

const sanitiseNewUser= (user) => {
    // TODO
    return user
}

module.exports = usersRouter