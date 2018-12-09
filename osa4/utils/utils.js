const checkIfValueMissing = (val) => {
    return (val === undefined || val === null)
}

const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

module.exports = {
    checkIfValueMissing,
    getTokenFrom
}