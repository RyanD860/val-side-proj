const express = require('express')
require('dotenv').config()

const userController = require('./controllers/usersController')

const PORT = process.env.PORT || 3000
const app = express()

app.use('/api/user', userController)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})