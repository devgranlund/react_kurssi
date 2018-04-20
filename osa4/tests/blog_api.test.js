const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)

describe('blog api tests', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('blogs can be inserted', async () => {
        const newBlog = {
            'title': 'Kuinka saisin rikki kookospähkinän',
            'author': 'M.A. Numminen',
            'url': 'www.manumminen.com',
            'likes': 2
        }
        
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    })

    afterAll(() => {
        server.close()
    })
})
    