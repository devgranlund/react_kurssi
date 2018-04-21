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
    
    test('blog can be deleted', async () => {
        const newBlog = {
            'title': 'VIP-huoneen lumoissa',
            'author': 'Jens Lapidus',
            'url': 'www.jenslapidus.com',
            'likes': 7
        }

        const toBeDeleted = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        let response = await api
            .get('/api/blogs')

        const found = response.body.find(one => one.author === 'Jens Lapidus')
        expect(typeof found).toBe('object')
        
        await api
            .delete('/api/blogs/'+ found._id)
            .expect(204)

        response = await api
            .get('/api/blogs')

        const notFound = response.body.find(one => one.author === 'Jens Lapidus')
        expect(typeof notFound).toBe('undefined')
        
    })
    
    test('blog can be edited', async () => {
        const newBlog = {
            'title': 'VIP-huoneen lumoissa',
            'author': 'Jens Lapidus',
            'url': 'www.jenslapidus.com',
            'likes': 7
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        let response = await api
            .get('/api/blogs')

        const toBeEdited = response.body.find(one => one.author === 'Jens Lapidus')
        expect(typeof toBeEdited).toBe('object')
        expect(toBeEdited.likes).toBe(7)
        
        toBeEdited.likes = 9
        
        await api
            .put('/api/blogs/' + toBeEdited._id)
            .send(toBeEdited)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        response = await api
            .get('/api/blogs')

        const found = response.body.find(one => one.author === 'Jens Lapidus')
        expect(typeof found).toBe('object')
        expect(found.likes).toBe(9)
    })

    afterAll(() => {
        server.close()
    })
})
    