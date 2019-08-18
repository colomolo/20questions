const express = require('express')
const http = require('http')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()

const server = http.Server(app)

app.set('port', 5000)
app.use(cookieParser())

app.get('/', async (req, res) => {
  if (!req.cookies.playerId) {
    const playerId = new Date().getTime()
    res.cookie('playerId', playerId)
  }

  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

require('./src/socketHandlers')(server)

app.use(express.static('dist'))

server.listen(app.get('port'), () => {
  console.log(`Listening port ${app.get('port')}`)
})
