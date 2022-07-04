const express = require('express')
const cors = require('cors')
const {Pool} = require("pg")
const bodyparser = require('body-parser')
require('dotenv').config()
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const pool = new Pool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
    ssl: true
})

// client.connect().then(() => {
//     console.log('Connected to db')
// }).catch((err) => {
//     console.log("Error connecting to db: " + err)
// })

pool.on('connect', () => {
    console.log('Base de Dados conectado com sucesso!');
  });

const userController = require('./controllers/usersController')

const PORT = process.env.PORT || 3000
const app = express()
app.use(cors())
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

app.use('/api/user', userController)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})