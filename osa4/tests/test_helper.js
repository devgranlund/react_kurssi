const Blog = require('../models/blog')
const User = require('../models/user')

// BLOGS
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

// USERS
const initialUsers = [
    {
        'username': 'jnummerla',
        'name': 'Jakko Nummela',
        'password': 'temppasswd1',
        'isAdult': true
    },
    {
        'username': 'evaltaoja',
        'name': 'Esko Valtaoja',
        'password': 'temppasswd2',
        'isAdult': true
    }
]

const usersInDb = async () => {
    const users = await User.find({})
    return users
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb,
    initialUsers, usersInDb
}