const catchRouter = require('express').Router()

catchRouter.get('/', async (request, response) => {
    response.redirect('/')
})

module.exports = catchRouter