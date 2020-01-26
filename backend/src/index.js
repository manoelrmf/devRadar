const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const http = require('http')
const cors = require('cors')
const app = express()
const { setupWebsocket } = require('./webSocket')

const server = http.Server(app)
setupWebsocket(server)

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-bgkjh.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})

app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(3333)