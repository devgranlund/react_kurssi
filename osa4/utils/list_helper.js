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

module.exports = {
    dummy,
    totalLikes
}