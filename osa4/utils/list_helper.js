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

const mostBlogs = (blogs) => {
    if (blogs.length < 1){
        return {}
    }
    const numbersOfBlogs = blogs.reduce((allNames, blog) => {
        if (allNames.find(current => current.author === blog.author)){
            allNames.find(current => current.author === blog.author).blogs++
        } else {
            const author = {
                'author': blog.author,
                'blogs': 1
            }
            allNames.push(author)
        }
        return allNames
    }, [])
    const authorWithMostBlogs = numbersOfBlogs.reduce((most, curr) => {
        if (most !== {}) {
            if (curr.blogs > most.blogs){
                most = curr
            }
        } else {
            most = curr
        }
        return most
    })
    return authorWithMostBlogs
}

const mostLikes = (blogs) => {
    return 0
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}