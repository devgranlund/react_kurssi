const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length > 0){
        return blogs
            .map(blog => blog.likes)
            .reduce((acc, cur) => acc + cur)
    } else {
        return 0
    }
}

const favoriteBlog = (blogs) => {
    if (blogs.length > 0){
        const max = blogs
            .map(blog => blog.likes)
            .reduce((acc, cur) => Math.max(acc, cur))
        return blogs.filter(blog => blog.likes === max)[0]
    } else {
        return {}
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}