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
    
    test('new blog without value in like gets initial value of 0', async () => {
        const newBlog = {
            'title': 'Tuntemattoman sotilaan alkulähteillä',
            'author': 'Väinö Linna',
            'url': 'www.kulttuuriaarre.com'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api
            .get('/api/blogs')
        
        const blog = response.body.find(one => one.author === 'Väinö Linna')
        expect(blog.likes).toBe(0)
    })

    afterAll(() => {
        server.close()
    })
})
    