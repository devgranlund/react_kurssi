const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { checkIfValueMissing, getTokenFrom } = require('../utils/utils')

// TODO user.blogs[] is not populated during save

blogsRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog
            .find({})
            .populate('user', { id: 1, username: 1, name: 1 })
        response.json(blogs.map(Blog.format))
    } catch (exception) {
        response.status(500).json({ 'error': 'server error' })
    }
})

blogsRouter.post('/', async (request, response) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ 'error': 'token missing or invalid' })
        }

        const blog = sanitiseNewBlog(new Blog(request.body))
        if (checkIfValueMissing(blog.title) || checkIfValueMissing(blog.url)) {
            return response.status(400).json({ 'error': 'title or url missing' })
        }

        const user = await User.findById(decodedToken.id)
        blog.user = user.id

        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog.id)
        await user.save()

        response.status(201).json(Blog.format(savedBlog))
    } catch (exception) {
        console.log(exception)
        if (exception.name === 'JsonWebTokenError') {
            response.status(401).json({ 'error': exception.message })
        } else {
            response.status(500).json({ 'error': 'server error' })
        }
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ 'error': 'token missing or invalid' })
        }

        const blog = await Blog.findById(request.params.id)
        if ((typeof blog.user === 'undefined')
            ||
            (blog.user.toString() === decodedToken.id.toString())) {
            await blog.remove()
            response.status(204).end()
        } else {
            response.status(401).json({ 'error': 'not authorized to remove' })
        }

    } catch (exception) {
        console.log(exception)
        if (exception.name === 'JsonWebTokenError') {
            response.status(401).json({ 'error': exception.message })
        } else {
            response.status(500).json({ 'error': 'server error' })
        }
    }
})

blogsRouter.post('/:id/comments', async (request, response) => {
    try {
        // const decodedToken = jwt.verify(request.token, process.env.SECRET)
        // if (!decodedToken.id) {
        //     return response.status(401).json({ 'error': 'token missing or invalid' })
        // }
        console.log('Request body: ',request.body)

        const body = request.body
        if (body.user === undefined || body.user === null){
            return response.status(400).json({ 'error': 'blog user missing' })
        }
        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: body.user,
            comments: body.comments
        }
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog)
        response.status(201).json(Blog.format(updatedBlog))
    } catch (exception) {
        console.log(exception)
        if (exception.name === 'JsonWebTokenError') {
            response.status(401).json({ 'error': exception.message })
        } else {
            response.status(500).json({ 'error': 'server error' })
        }
    }
})

blogsRouter.put('/:id', async (request, response) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ 'error': 'token missing or invalid' })
        }

        const body = request.body
        if (body.user === undefined || body.user === null){
            return response.status(400).json({ 'error': 'blog user missing' })
        }
        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: body.user,
            comments: body.comments
        }

        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog)
        response.status(200).json(Blog.format(updatedBlog))
    } catch (exception) {
        console.log(exception)
        if (exception.name === 'JsonWebTokenError') {
            response.status(401).json({ 'error': exception.message })
        } else {
            response.status(500).json({ 'error': 'server error' })
        }
    }
})

const sanitiseNewBlog = (blog) => {
    if (checkIfValueMissing(blog.likes)) {
        blog.likes = 0
    }
    return blog
}

module.exports = blogsRouter