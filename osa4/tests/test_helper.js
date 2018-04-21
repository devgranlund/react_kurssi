const Blog = require('../models/blog')

const initialBlogs = [
    {
        'title': 'Toisesta maailmasta',
        'author': 'Jaakko Nummela',
        'url': 'www.nummela.com',
        'likes': 1
    },
    {
        'title': 'Meteoriitti',
        'author': 'Esko Valtaoja',
        'url': 'www.valtaoja.fi',
        'likes': 2
    }
]

const nonExistingId = async () => {
    const blog = new Blog()
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}