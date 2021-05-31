const config = require('./utils/config')
const middleware = require('./utils/middleware')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const personsRouter = require('./controllers/persons')

mongoose.connect(config.MONGODB_URI, {useCreateIndex: true, useFindAndModify: true, useUnifiedTopology: true, useNewUrlParser: true})
  .then(() => {
    console.log('MongoDB connected,')
  })
  .catch(err => console.log('MongoDB connection failed', err.message))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(middleware.requestLogger)

app.use('/api/persons', personsRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app