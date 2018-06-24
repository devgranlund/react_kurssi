const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
let token = ''
const { initialBlogs, nonExistingId, blogsInDb } = require('./test_helper')

describe('blog api tests', () => {
    
    beforeAll(async () => {
        await Blog.remove()
        console.log('DB cleared')

        for (let blog of initialBlogs) {
            let blogObject = new Blog(blog)
            await blogObject.save()
        }

        let newUser = {
            'username': 'cdickens',
            'name': 'Charles Dickens',
            'password': 'expectations1'
        }
        const saltRound = 10
        newUser.password = await bcrypt.hash(newUser.password, saltRound)
        const userObject = User(newUser)
        await userObject.save()

        let login = {
            'username': 'cdickens',
            'password': 'expectations1'
        }
        const resp = await api
            .post('/api/login')
            .send(login)
        
        token = resp.body.token
        
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

    test('blog cannot be inserted without token', async () => {
        const newBlog = {
            'title': 'Kuinka saisin rikki kookospähkinän?',
            'author': 'M.A. Numminen',
            'url': 'www.manumminen.com',
            'likes': 2
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)
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
            .set('Authorization', 'bearer ' + token)
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
            .set('Authorization', 'bearer ' + token)
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
            .set('Authorization', 'bearer ' + token)
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
            .set('Authorization', 'bearer ' + token)
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)

    })

    test('blog cannot be deleted without tokeun', async () => {
        const newBlog = {
            'title': 'Top Dog',
            'author': 'Jens Lapidus',
            'url': 'www.jenslapidus.com',
            'likes': 9
        }

        const toBeDeleted = await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        let response = await api
            .get('/api/blogs')

        const found = response.body.find(one => one.title === 'Top Dog')
        expect(typeof found).toBe('object')

        await api
            .delete('/api/blogs/'+ found.id)
            .expect(401)
    })
    
    test('blog can be deleted', async () => {
        const newBlog = {
            'title': 'Kova meno',
            'author': 'Jens Lapidus',
            'url': 'www.jenslapidus.com',
            'likes': 7
        }

        const toBeDeleted = await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        let response = await api
            .get('/api/blogs')

        const found = response.body.find(one => one.title === 'Kova meno')
        expect(typeof found).toBe('object')
        
        await api
            .delete('/api/blogs/'+ found.id)
            .set('Authorization', 'bearer ' + token)            
            .expect(204)

        response = await api
            .get('/api/blogs')

        const notFound = response.body.find(one => one.title === 'Kova meno')
        expect(typeof notFound).toBe('undefined')
        
    })
    
    test('blog cannot be deleted with wrong user', async () => {
        const newBlog = {
            'title': 'Ei voi poistaa',
            'author': 'Jens Lapidus',
            'url': 'www.jenslapidus.com',
            'likes': 7
        }

        const canNotBeDeleted = await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        let blogs = await api
            .get('/api/blogs')

        const inserted = blogs.body.find(one => one.title === 'Ei voi poistaa')
        expect(typeof inserted).toBe('object')

        let wrongUser = {
            'username': 'tjones',
            'name': 'Tom Jones',
            'password': 'bignews1'
        }
        const saltRound = 10
        wrongUser.password = await bcrypt.hash(wrongUser.password, saltRound)
        const userObject = User(wrongUser)
        await userObject.save()

        let login = {
            'username': 'tjones',
            'password': 'bignews1'
        }
        const resp = await api
            .post('/api/login')
            .send(login)

        const wrongToken = resp.body.token
        
        // try to delete with wrong token
        await api
            .delete('/api/blogs/'+ inserted.id)
            .set('Authorization', 'bearer ' + wrongToken)
            .expect(401)

        let response = await api
            .get('/api/blogs')

        const found = response.body.find(one => one.title === 'Ei voi poistaa')
        expect(typeof found).toBe('object')
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
            .set('Authorization', 'bearer ' + token)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        let response = await api
            .get('/api/blogs')

        const toBeEdited = response.body.find(one => one.title === 'VIP-huoneen lumoissa')
        expect(typeof toBeEdited).toBe('object')
        expect(toBeEdited.likes).toBe(7)
        
        toBeEdited.likes = 9
        
        await api
            .put('/api/blogs/' + toBeEdited.id)
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
    