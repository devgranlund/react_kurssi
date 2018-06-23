const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const User = require('../models/user')
//const { initialBlogs, nonExistingId, blogsInDb } = require('./test_helper')

describe.only('login api tests', () => {

    // beforeAll(async () => {
    //     //await User.remove()
    //     //console.log('DB cleared')
    //    
    //     //console.log('DB initiated')
    // })

    test('jwt token is returned with correct username and password combination', async () => {
        const newUser = {
            'username': 'sking',
            'name': 'Stephen King',
            'password': 'carrie1'
        }

        await api
            .post('/api/users')
            .send(newUser)

        const response = await api.get('/api/users')
        const found = response.body.find(one => one.username === 'sking')
        
        const login = {
            'username': 'sking',
            'password': 'carrie1'
        }

        const resp = await api
            .post('/api/login')
            .send(login)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    afterAll(() => {
        server.close()
    })
})
