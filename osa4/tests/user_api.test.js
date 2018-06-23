const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const { initialUsers, usersInDb } = require('./test_helper')

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
    
    test('new user without adult info will be adult', async () => {
        const newUser = {
            'username': 'jjoyce',
            'name': 'James Joyce',
            'password': 'temppasswd4'
        }
        
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/users')
        const found = response.body.find(one => one.username === 'jjoyce')
        expect(found.isAdult === true)
    })
    
    test('new user with existing username will not be accepted', async () => {
        const newUser = {
            'username': 'jjoyce',
            'name': 'James Joyce',
            'password': 'temppasswd4'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })
    
    test('password under three charactes will not be accepted', async () => {
        let newUser = {
            'username': 'ehemingway',
            'name': 'Ernest Hemingway',
            'password': 't'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        newUser = {
            'username': 'ehemingway',
            'name': 'Ernest Hemingway',
            'password': 'tq'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        newUser = {
            'username': 'ehemingway',
            'name': 'Ernest Hemingway',
            'password': 'tqr'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
    })
    
    test('password is not returned in GET message', async () => {
        const response = await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const first = response.body[0]
        expect(typeof first.password).toBe('undefined')
    })
    
    afterAll(() => {
        server.close()
    })
})