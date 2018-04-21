const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    } catch (exception) {
        response.status(500).json({ 'error': 'server error' })
    }
})

blogsRouter.post('/', async (request, response) => {
    try {
        const blog = sanitiseNewBlog(new Blog(request.body))
        if (checkIfValueMissing(blog.title) || checkIfValueMissing(blog.url)) {
            return response.status(400).json({'error': 'title or url missing'})
        }
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } catch (exception) {
        response.status(500).json({ 'error': 'server error' })
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ 'error': 'server error' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    try {
        const body = request.body
        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
        }
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.status(200).json(updatedBlog)
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ 'error': 'server error' })
    }
})

const sanitiseNewBlog = (blog) => {
    if (checkIfValueMissing(blog.likes)) {
        blog.likes = 0
    }
    return blog
}

const checkIfValueMissing = (val) => {
    return (val === undefined || val === null)
}

module.exports = blogsRouter