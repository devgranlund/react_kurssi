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
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

const sanitateNewBlog = (blog) => {
    if (blog.likes === undefined || blog.likes === null){
        blog.likes = 0
    }
    return blog
} 

module.exports = blogsRouter