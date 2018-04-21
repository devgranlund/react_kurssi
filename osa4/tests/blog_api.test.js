const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, nonExistingId, blogsInDb } = require('./test_helper')

describe('blog api tests', () => {
    
    beforeAll(async () => {
        await Blog.remove()
        console.log('DB cleared')

        for (let blog of initialBlogs) {
            let blogObject = new Blog(blog)
            await blogObject.save()
        }
        console.log('DB initiated')
    })

    test('blogs are returned as json', async () => {
        const blogsInDatabase = await blogsInDb()
        
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        expect(response.body.length).toBe(blogsInDatabase.length)
    })
    
    test('blogs can be inserted', async () => {
        const blogsInDatabase = await blogsInDb()

        const newBlog = {
            'title': 'Kuinka saisin rikki kookospähkinän?',
            'author': 'M.A. Numminen',
            'url': 'www.manumminen.com',
            'likes': 2
        }
        
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/blogs')
        
        const authors = response.body.map(b => b.author)

        expect(response.body.length).toBe(blogsInDatabase.length + 1)
        expect(authors).toContain('M.A. Numminen')
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

    test('new blog without url gets 400 response', async () => {
        const newBlog = {
            'title': 'Kokoomus on rikki',
            'author': 'Harry Hjallis Harkimo',
            'likes': 2
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
    })

    test('new blog without title gets 400 response', async () => {
        const newBlog = {
            'url': 'www.iItalehti.fi',
            'author': 'Ulla Appelsin',
            'likes': 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)

    })

    afterAll(() => {
        server.close()
    })
})
    