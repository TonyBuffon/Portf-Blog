
// Importing NPM Modules
const express = require("express")
const dotenv = require("dotenv")
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const hpp = require('hpp')
const cors = require("cors")
dotenv.config('.env')

// Importing Modules

const postRoute = require('./routes/postRoute')
const projectRoute = require('./routes/projectsRoute')
const userInfoRoute = require('./routes/userRoute')
// Init app
const app = express()

app.use(cors())
// Security HTTP Header
app.use(helmet())

// Limit Requests 
const limiter = rateLimiter({
    max: 200,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests'
})

app.use('/api', limiter)

// Body Parser , reading data from body into req.body
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// Data sanitization against NoSQL query injection

app.use(mongoSanitize())

// Data sanitization against xss
app.use(xss())


// Routes
app.use('/api/v1/posts', postRoute)
app.use('/api/v1/projects', projectRoute)
app.use('/api/v1/user', userInfoRoute)
module.exports = app