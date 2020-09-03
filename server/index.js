const express = require('express')
const socketio = require('socket.io')
const http = require('http')

// import router 
const router = require('./router')

// define port number
const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)

const io = socketio(server)

// listen on the connection event for incoming sockets and log it to the console
io.on('connection', (socket) => {
    console.log("new connection");
    socket.on('disconnect', () => {
        console.log('User had left');
    })
})

// middleware
app.use(router)

server.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`);
})




