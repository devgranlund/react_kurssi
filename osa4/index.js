const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)

morgan.token('request-data', function getRequestData(req, res) {
    return JSON.stringify(req.body)
})

app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :request-data :status :res[content-length] - :response-time ms'))

if (process.env.NODE_ENV !== 'production') {
    console.log('working in dev environment, using local env values')
    require('dotenv').config()
}

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})