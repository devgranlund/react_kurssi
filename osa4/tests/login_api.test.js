const supertest = require('supertest')
const bcrypt = require('bcrypt')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
//const { initialBlogs, nonExistingId, blogsInDb } = require('./test_helper')

describe.only('login api tests', () => {

    beforeAll(async () => {
        let newUser = {
            'username': 'sking',
            'name': 'Stephen King',
            'password': 'carrie1'
        }
        const saltRound = 10
        newUser.password = await bcrypt.hash(newUser.password, saltRound)
        const userObject = User(newUser)
        await userObject.save()
        console.log('DB initiated')
    })

    test('jwt token is returned with correct username and password combination', async () => {
        const login = {
            'username': 'sking',
            'password': 'carrie1'
        }

        const resp = await api
            .post('/api/login')
            .send(login)
            .expect(200)
            .expect('Content-Type', /application\/json/)
       
        expect(typeof resp.body.token).toBe('string')
    })
    
    test('access is denied with wrong password', async () => {
        const login = {
            'username': 'sking',
            'password': 'carrie'
        }

        const resp = await api
            .post('/api/login')
            .send(login)
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })

    test('access is denied with wrong username', async () => {
        const login = {
            'username': 'king',
            'password': 'carrie1'
        }

        const resp = await api
            .post('/api/login')
            .send(login)
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })
    
    afterAll(() => {
        server.close()
    })
})
