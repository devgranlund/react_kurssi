const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const checkIfValueMissing = require('../utils/utils')

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
        
        const blog = sanitiseNewBlog(new Blog(request.body))
        if (checkIfValueMissing(blog.title) || checkIfValueMissing(blog.url)) {
            return response.status(400).json({'error': 'title or url missing'})
        }
        
        // TEMP
        const user = (await User.find({}))[0]
        blog.user = user.id
        
        const savedBlog = await blog.save()
        
        user.blogs = user.blogs.concat(savedBlog.id)
        await user.save()
        
        response.status(201).json(Blog.format(savedBlog))
    } catch (exception) {
        response.status(500).json({ 'error': 'server error' })
    }
})

// TODO delete joins
blogsRouter.delete('/:id', async (request, response) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ 'error': 'server error' })
    }
})

// TODO update joins
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
        response.status(200).json(Blog.format(updatedBlog))
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

module.exports = blogsRouter