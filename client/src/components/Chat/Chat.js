import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

let socket

const Chat = ({location}) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const ENDPOINT = 'localhost:5000'

    useEffect(() => {
        const {name, room} = queryString.parse(location.search)

        // create a new manager for the given URL and attempts to
        // resuse an existing Manager for subsequent calls
        // a new socket instance is returned for the namespace specified by the pathname
        // in the URL. defaulting to /. For example, 
        // if the url is http://localhost/users, a transport connection will be established to http://localhost and a Socket.IO connection will be established to /users.
        socket = io(ENDPOINT)

        setName(name)
        setName(room)

        // console.log(socket)
        socket.emit('join', {name, room}, ({error}) => {
            alert(error)
        })
         
        // unmountiing
        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [ENDPOINT, location.search])


    return (
        <h1>Chat</h1>
    )
}

export default Chat