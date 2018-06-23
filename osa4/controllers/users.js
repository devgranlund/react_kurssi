const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const {checkIfValueMissing} = require('../utils/utils')

usersRouter.get('/', async (request, response) => {
    try {
        const users = await User
            .find({})
            .populate('blogs', { id: 1, likes: 1, author: 1, title: 1, url: 1 })
        response.json(users.map(User.format))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ 'error': 'server error' })
    }
})

usersRouter.post('/', async (request, response) => {
    try {
        const users = await User.find()
        const user = sanitiseNewUser(new User(request.body))
        if (userNameIsNotUnique(user, users)){
            return response.status(400).json({'error': 'username not unique'})
        }
        if (passwordIsNotLegal(user)){
            return response.status(400).json({'error': 'password is not legal'})            
        }
        const saltRound = 10
        user.password = await bcrypt.hash(user.password, saltRound)
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (exception) {
        response.status(500).json({ 'error': 'server error' })
    }
})

const sanitiseNewUser = (user) => {
    if (checkIfValueMissing(user.isAdult)){
        user.isAdult = true
    }
    return user
}

const userNameIsNotUnique = (user, existingUsers) => {
    const userFound = existingUsers.find(one => one.username === user.username)
    if (typeof userFound === 'undefined'){
        return false
    } else {
        return true
    }
}

const passwordIsNotLegal = (user) => {
    if (user.password.length < 3){
        return true
    }
    return false        
}

module.exports = usersRouter