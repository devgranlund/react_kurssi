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
    if (blogs.length < 1){
        return {}
    }
    const authorsWithLikes = blogs.reduce((allLikes, blog) => {
        if (allLikes.find(current => current.author === blog.author)){
            const currentLikes = allLikes.find(current => current.author === blog.author).likes
            allLikes.find(current => current.author === blog.author).likes = currentLikes + blog.likes
        } else {
            const author = {
                'author': blog.author,
                'likes': blog.likes
            }
            allLikes.push(author)
        }
        return allLikes
    }, [])
    console.log(authorsWithLikes)
    const authorWithMostLikes = authorsWithLikes.reduce((most, curr) => {
        if (most !== {}) {
            if (curr.likes > most.likes){
                most = curr
            }
        } else {
            most = curr
        }
        return most
    })
    return authorWithMostLikes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}