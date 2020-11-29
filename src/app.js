const express = require('express')
const morgan = require('morgan')

const app = express()
const port = process.env.PORT || 4000

// environment variables
app.set('port', port)

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', require('./routes/users.routes'))

module.exports = app