import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages.js'
import './Chat.css'

let socket


const Chat = ({location}) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    // single message
    const [message, setMessage] = useState('')
    // store all messages
    const [messages, setMessages] = useState([])
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
        setRoom(room)

        // console.log(socket)
        // join the room
        socket.emit('join', {name, room}, (error) => {
            if (error) {
                alert(error)
            }
            
        })
         
        // unmountiing
        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [ENDPOINT, location.search])

    useEffect(() => {
        
        socket.on('message', (message) => {
            // console.log("call useEffect", messages)
            setMessages([...messages, message]);
        })
    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, ()=> setMessage(''));
        }
    }

    console.log("message", message)
    console.log("messages", messages)
    

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message}  setMessage ={setMessage} sendMessage={sendMessage}/>
            </div>
        </div>
    )
}

export default Chat