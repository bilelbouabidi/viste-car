const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes/routes')
const path = require('path')
mongoose.connect('mongodb+srv://bilel:bilel123456@cluster0.wasojvm.mongodb.net/?retryWrites=true&w=majority')
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database connection have been Established successfuly!')
})

const app = express()
app.use(cors())

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})

app.use('/',routes)
app.use('/private', express.static(path.join(__dirname, 'private')));