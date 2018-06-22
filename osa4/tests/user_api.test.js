const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const User = require('../models/user')
const {initialUsers, usersInDb} = require('./test_helper')

describe('user api tests', () => {

    beforeAll(async () => {
        await User.remove()
        console.log('DB cleared')

        for (let user of initialUsers) {
            let userObject = new User(user)
            await userObject.save()
        }
        console.log('DB initiated')
    })

    test('users are returned as json', async () => {
        const usersInDatabase = await usersInDb()

        const response = await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.length).toBe(usersInDatabase.length)
    })

    test('users can be inserted', async () => {
        const usersInDatabase = await usersInDb()

        const newUser = {
            'username': 'dadams',
            'name': 'Douglas Adams',
            'password': 'temppasswd3',
            'isAdult': true
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/users')

        const users = response.body.map(b => b.username)

        expect(response.body.length).toBe(usersInDatabase.length + 1)
        expect(users).toContain('dadams')
    }) 
    
    afterAll(() => {
        server.close()
    })
})