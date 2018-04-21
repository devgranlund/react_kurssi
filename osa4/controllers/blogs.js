const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response) => {
    const blog = sanitateNewBlog(new Blog(request.body))
    if (checkIfValueMissing(blog.title) || checkIfValueMissing(blog.url)){
        return response.status(400).json({ 'error': 'title or url missing' })
    }
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

const sanitateNewBlog = (blog) => {
    if (checkIfValueMissing(blog.likes)){
        blog.likes = 0
    }
    return blog
} 

const checkIfValueMissing = (val) => {
    return (val === undefined || val === null)
}

module.exports = blogsRouter