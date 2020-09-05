const express = require('express')
const socketio = require('socket.io')
const http = require('http')

// import router 
const router = require('./router')
// users helper function
const {addUser, removeUser, getUser, getUsersInRoom} = require('./users')

// define port number
const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)

const io = socketio(server)

// listen on the connection event for incoming sockets and log it to the console
io.on('connection', (socket) => {
    console.log("new connection");

    socket.on('join', ({name, room}, callback) => {
        const {error, user} = addUser({id: socket.id, name, room})
        if (error) {
            return callback(error)
        }

        console.log(user)
        console.log(user.room)

        // emit the message to the user (new connection)
        socket.emit('message', {user: 'admin', text: `(new connection) ${user.name}, welcome to the room ${user.room}`})
        
        // boradcast the message to other users in the same room
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name}, has joined!`});

        // subscribe the socket to a given channel
        socket.join(user.room);
        // console.log(name, room);
        // const error = true;
        // if (error) {
        //     callback({error:"error"})
        // }

        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});

        callback()
    });

    // the message from the client to the room channel
    socket.on('sendMessage', (message, callback) => {
        // get the user
        const user = getUser(socket.id);
        // emit message
        io.to(user.room).emit('message', {user: user.name, text:message});
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
        callback();
    })

    socket.on('disconnect', () => {
        console.log('User had left');
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', {user:'admin', text: `${user.name} has left.`})
        }
    })
})

// middleware
app.use(router) 

server.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`);
})




