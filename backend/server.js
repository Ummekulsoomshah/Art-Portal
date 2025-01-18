const http=require('http')
const app=require('./app')
const server=http.createServer(app)
const db=require('./db/config')

server.listen(3000)