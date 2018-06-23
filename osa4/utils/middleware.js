const tokenExtractor = (request, response, next) => {
    if (request) {
        const token = getTokenFrom(request)
        request.token = token
    }    
    next()
}

// private, not exported
const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

module.exports = tokenExtractor